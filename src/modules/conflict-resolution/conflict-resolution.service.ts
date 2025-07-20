import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandDispute, DisputeStatus } from './entities/land-dispute.entity';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';
import { LandStatus } from '../land-registration/entities/land.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ConflictResolutionService {
  constructor(
    @InjectRepository(LandDispute)
    private readonly disputeRepository: Repository<LandDispute>,
    private readonly landService: LandRegistrationService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createDisputeDto: CreateDisputeDto): Promise<LandDispute> {
    // Get land and users
    const [land, complainant, respondents] = await Promise.all([
      this.landService.findOne(createDisputeDto.landId),
      this.usersService.findOne(createDisputeDto.complainantId),
      Promise.all(createDisputeDto.respondentIds.map(id => this.usersService.findOne(id))),
    ]);

    // Create dispute without saving
    const dispute = this.disputeRepository.create({
      status: DisputeStatus.PENDING,
      type: createDisputeDto.type,
      description: createDisputeDto.description,
      evidence: createDisputeDto.evidence || [],
      requiresFieldVisit: createDisputeDto.requiresFieldVisit || false,
    });

    // Assign relationships
    dispute.land = land;
    dispute.complainant = complainant;
    dispute.respondents = respondents;

    // Save the dispute
    const savedDispute = await this.disputeRepository.save(dispute);

    // Update land status
    await this.landService.update(land.id, { 
      status: LandStatus.UNDER_DISPUTE 
    });

    // Send notifications
    await this.notificationsService.sendNotification(
      savedDispute.complainant.id,
      NotificationType.DISPUTE_FILED,
      {
        disputeId: savedDispute.id,
        landId: land.id,
        plotNumber: land.plotNumber,
      }
    );

    for (const respondent of savedDispute.respondents) {
      await this.notificationsService.sendNotification(
        respondent.id,
        NotificationType.DISPUTE_FILED,
        {
          disputeId: savedDispute.id,
          landId: land.id,
          plotNumber: land.plotNumber,
          complainant: savedDispute.complainant,
        }
      );
    }

    return savedDispute;
  }

  async findAll(): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      relations: ['land', 'complainant', 'respondents'],
    });
  }

  async findOne(id: string): Promise<LandDispute> {
    const dispute = await this.disputeRepository.findOne({
      where: { id },
      relations: ['land', 'complainant', 'respondents'],
    });

    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found`);
    }

    return dispute;
  }

  async update(id: string, updateDisputeDto: UpdateDisputeDto): Promise<LandDispute> {
    const dispute = await this.findOne(id);

    Object.assign(dispute, updateDisputeDto);

    return this.disputeRepository.save(dispute);
  }

  async remove(id: string): Promise<void> {
    const dispute = await this.findOne(id);
    await this.disputeRepository.remove(dispute);
  }

  async resolve(id: string, resolution: string): Promise<LandDispute> {
    const dispute = await this.findOne(id);

    dispute.status = DisputeStatus.RESOLVED;
    dispute.resolution = resolution;
    dispute.resolvedAt = new Date();

    // Update land status back to registered
    await this.landService.update(dispute.land.id, {
      status: LandStatus.REGISTERED,
    });

    const resolvedDispute = await this.disputeRepository.save(dispute);

    // Send notifications
    await this.notificationsService.sendNotification(
      dispute.complainant.id,
      NotificationType.DISPUTE_RESOLVED,
      {
        disputeId: resolvedDispute.id,
        landId: dispute.land.id,
        plotNumber: dispute.land.plotNumber,
        resolution,
      }
    );

    for (const respondent of dispute.respondents) {
      await this.notificationsService.sendNotification(
        respondent.id,
        NotificationType.DISPUTE_RESOLVED,
        {
          disputeId: resolvedDispute.id,
          landId: dispute.land.id,
          plotNumber: dispute.land.plotNumber,
          resolution,
        }
      );
    }

    return resolvedDispute;
  }

  async findByStatus(status: DisputeStatus): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      where: { status },
      relations: ['land', 'complainant', 'respondents'],
    });
  }

  async findByParticipant(userId: string): Promise<LandDispute[]> {
    return this.disputeRepository.find({
      where: [
        { complainant: { id: userId } },
        { respondents: { id: userId } },
      ],
      relations: ['land', 'complainant', 'respondents'],
    });
  }

  async addComment(id: string, comment: string): Promise<LandDispute> {
    const dispute = await this.findOne(id);
    dispute.comments.push(comment);
    return this.disputeRepository.save(dispute);
  }

  async recordFieldVisit(id: string, report: string): Promise<LandDispute> {
    const dispute = await this.findOne(id);
    dispute.requiresFieldVisit = true;
    dispute.fieldVisitDate = new Date();
    dispute.fieldVisitReport = report;
    return this.disputeRepository.save(dispute);
  }
} 