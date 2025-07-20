import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { ConstructionPermit, PermitStatus } from './entities/construction-permit.entity';
import { CreatePermitDto } from './dto/create-permit.dto';
import { ReviewPermitDto } from './dto/review-permit.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { LandStatus } from '../../common/enums/land-status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UrbanizationService {
  constructor(
    @InjectRepository(ConstructionPermit)
    private readonly permitRepository: Repository<ConstructionPermit>,
    private readonly landService: LandRegistrationService,
  ) {}

  async create(createPermitDto: CreatePermitDto, applicant: User): Promise<ConstructionPermit> {
    const land = await this.landService.findOne(createPermitDto.landId);

    // Validate land ownership
    if (land.owner.id !== applicant.id) {
      throw new ConflictException('You do not own this land');
    }

    // Check if land is registered and not under dispute
    if (!land.isVerified || land.status !== LandStatus.REGISTERED) {
      throw new ConflictException('Land must be registered and verified before applying for construction permit');
    }

    // Check for existing active permits
    const existingPermit = await this.permitRepository.findOne({
      where: {
        land: { id: land.id },
        status: PermitStatus.PENDING,
      },
    });

    if (existingPermit) {
      throw new ConflictException('There is already a pending permit for this land');
    }

    const permit = this.permitRepository.create({
      ...createPermitDto,
      land,
      applicant,
      status: PermitStatus.PENDING,
    });

    // Update land status
    await this.landService.update(land.id, { status: LandStatus.PENDING_CONSTRUCTION }, land.owner);

    return this.permitRepository.save(permit);
  }

  async findAll(): Promise<ConstructionPermit[]> {
    return this.permitRepository.find();
  }

  async findOne(id: string): Promise<ConstructionPermit> {
    const permit = await this.permitRepository.findOne({ where: { id } });
    if (!permit) {
      throw new NotFoundException(`Construction permit with ID "${id}" not found`);
    }
    return permit;
  }

  async findByUser(userId: string): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      where: { applicant: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async review(id: string, reviewPermitDto: ReviewPermitDto, reviewer: User): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    if (permit.status !== PermitStatus.PENDING) {
      throw new ConflictException('Permit is not in pending status');
    }

    permit.status = reviewPermitDto.approved ? PermitStatus.APPROVED : PermitStatus.REJECTED;
    permit.reviewedBy = reviewer;
    permit.reviewComments = reviewPermitDto.reviewComments;
    permit.conditions = reviewPermitDto.conditions || [];
    permit.requiresInspection = reviewPermitDto.requiresInspection || false;
    permit.permitFee = reviewPermitDto.permitFee || 0;

    if (reviewPermitDto.approved) {
      permit.approvalDate = new Date();
      permit.expiryDate = reviewPermitDto.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // Default 1 year

      // Update land status
      await this.landService.update(
        permit.land.id,
        { status: LandStatus.CONSTRUCTION_APPROVED },
        permit.land.owner,
      );
    } else {
      // Reset land status
      await this.landService.update(
        permit.land.id,
        { status: LandStatus.REGISTERED },
        permit.land.owner,
      );
    }

    return this.permitRepository.save(permit);
  }

  async recordPayment(id: string): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    if (permit.status !== PermitStatus.APPROVED) {
      throw new ConflictException('Permit must be approved before recording payment');
    }

    if (permit.feesPaid) {
      throw new ConflictException('Permit fees have already been paid');
    }

    permit.feesPaid = true;
    return this.permitRepository.save(permit);
  }

  async scheduleInspection(id: string, date: Date): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    if (!permit.requiresInspection) {
      throw new ConflictException('This permit does not require inspection');
    }

    permit.inspectionDate = date;
    return this.permitRepository.save(permit);
  }

  async submitInspectionReport(id: string, report: string): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    if (!permit.requiresInspection) {
      throw new ConflictException('This permit does not require inspection');
    }

    permit.inspectionReport = report;
    return this.permitRepository.save(permit);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkExpiredPermits() {
    const expiredPermits = await this.permitRepository.find({
      where: {
        status: PermitStatus.APPROVED,
        expiryDate: LessThan(new Date()),
      },
    });

    for (const permit of expiredPermits) {
      permit.status = PermitStatus.EXPIRED;
      await this.permitRepository.save(permit);

      // Reset land status
      await this.landService.update(
        permit.land.id,
        { status: LandStatus.REGISTERED },
        permit.land.owner,
      );
    }
  }

  async getPendingPermits(): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      where: { status: PermitStatus.PENDING },
      order: { createdAt: 'ASC' },
    });
  }

  async getApprovedPermits(): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      where: { status: PermitStatus.APPROVED },
      order: { approvalDate: 'DESC' },
    });
  }
} 