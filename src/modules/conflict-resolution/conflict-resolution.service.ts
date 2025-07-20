import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandDispute, DisputeStatus } from './entities/land-dispute.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { UsersService } from '../users/users.service';
import { LandStatus } from '../../common/enums/land-status.enum';

@Injectable()
export class ConflictResolutionService {
  constructor(
    @InjectRepository(LandDispute)
    private readonly disputeRepository: Repository<LandDispute>,
    private readonly landService: LandRegistrationService,
    private readonly usersService: UsersService,
  ) {}

  async create(createDisputeDto: CreateDisputeDto, complainant: User): Promise<LandDispute> {
    const land = await this.landService.findOne(createDisputeDto.landId);
    const respondents = await Promise.all(
      createDisputeDto.respondentIds.map(id => this.usersService.findOne(id))
    );

    // Check for existing active disputes
    const existingDispute = await this.disputeRepository.findOne({
      where: {
        land: { id: land.id },
        status: DisputeStatus.PENDING,
      },
    });

    if (existingDispute) {
      throw new ConflictException('There is already an active dispute for this land');
    }

    const dispute = this.disputeRepository.create({
      ...createDisputeDto,
      land,
      complainant,
      respondents,
      status: DisputeStatus.PENDING,
    });

    // Update land status
    await this.landService.update(land.id, { status: LandStatus.UNDER_DISPUTE }, land.owner);

    return this.disputeRepository.save(dispute);
  }

  async findAll(): Promise<LandDispute[]> {
    return this.disputeRepository.find();
  }

  async findOne(id: string): Promise<LandDispute> {
    const dispute = await this.disputeRepository.findOne({ where: { id } });
    if (!dispute) {
      throw new NotFoundException(`Dispute with ID "${id}" not found`);
    }
    return dispute;
  }

  async findByUser(userId: string): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      where: [
        { complainant: { id: userId } },
        { respondents: { id: userId } },
      ],
    });
  }

  async update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<LandDispute> {
    const dispute = await this.findOne(id);

    if (updateDisputeDto.mediatorId) {
      const mediator = await this.usersService.findOne(updateDisputeDto.mediatorId);
      dispute.mediator = mediator;
    }

    if (updateDisputeDto.status === DisputeStatus.RESOLVED) {
      dispute.resolutionDate = new Date();
      // Update land status back to registered
      await this.landService.update(
        dispute.land.id,
        { status: LandStatus.REGISTERED },
        dispute.land.owner,
      );
    }

    Object.assign(dispute, updateDisputeDto);
    return this.disputeRepository.save(dispute);
  }

  async addComment(id: string, comment: string): Promise<LandDispute> {
    const dispute = await this.findOne(id);
    dispute.comments = [...dispute.comments, comment];
    return this.disputeRepository.save(dispute);
  }

  async scheduleFieldVisit(id: string, date: Date): Promise<LandDispute> {
    const dispute = await this.findOne(id);
    dispute.requiresFieldVisit = true;
    dispute.fieldVisitDate = date;
    return this.disputeRepository.save(dispute);
  }

  async submitFieldVisitReport(id: string, report: string): Promise<LandDispute> {
    const dispute = await this.findOne(id);
    dispute.fieldVisitReport = report;
    return this.disputeRepository.save(dispute);
  }

  async getActiveDisputes(): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      where: [
        { status: DisputeStatus.PENDING },
        { status: DisputeStatus.IN_MEDIATION },
      ],
    });
  }

  async getResolvedDisputes(): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      where: { status: DisputeStatus.RESOLVED },
    });
  }
} 