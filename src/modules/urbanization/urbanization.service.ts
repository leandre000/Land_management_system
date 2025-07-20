import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConstructionPermit, PermitStatus } from './entities/construction-permit.entity';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';
import { LandStatus } from '../land-registration/entities/land.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class UrbanizationService {
  constructor(
    @InjectRepository(ConstructionPermit)
    private readonly permitRepository: Repository<ConstructionPermit>,
    private readonly landService: LandRegistrationService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createPermitDto: CreatePermitDto): Promise<ConstructionPermit> {
    const [land, applicant] = await Promise.all([
      this.landService.findOne(createPermitDto.landId),
      this.usersService.findOne(createPermitDto.applicantId),
    ]);

    if (land.status === LandStatus.UNDER_DISPUTE) {
      throw new ConflictException('Cannot apply for construction permit while land is under dispute');
    }

    if (land.status === LandStatus.PENDING_TRANSFER) {
      throw new ConflictException('Cannot apply for construction permit while land transfer is pending');
    }

    // Create permit without saving
    const permit = this.permitRepository.create({
      ...createPermitDto,
      land,
      applicant,
      status: PermitStatus.PENDING,
    });

    const savedPermit = await this.permitRepository.save(permit);

    // Update land status
    await this.landService.update(land.id, {
      status: LandStatus.PENDING_CONSTRUCTION,
    });

    // Send notification
    await this.notificationsService.sendNotification(
      savedPermit.applicant.id,
      NotificationType.PERMIT_APPLIED,
      {
        permitId: savedPermit.id,
        landId: land.id,
        plotNumber: land.plotNumber,
        constructionType: permit.constructionType,
      }
    );

    return savedPermit;
  }

  async findAll(): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      relations: ['land', 'applicant'],
    });
  }

  async findOne(id: string): Promise<ConstructionPermit> {
    const permit = await this.permitRepository.findOne({
      where: { id },
      relations: ['land', 'applicant'],
    });

    if (!permit) {
      throw new NotFoundException(`Construction permit with ID ${id} not found`);
    }

    return permit;
  }

  async update(id: string, updatePermitDto: UpdatePermitDto): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    Object.assign(permit, updatePermitDto);

    return this.permitRepository.save(permit);
  }

  async remove(id: string): Promise<void> {
    const permit = await this.findOne(id);
    await this.permitRepository.remove(permit);
  }

  async approve(id: string): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    permit.status = PermitStatus.APPROVED;
    permit.approvalDate = new Date();
    permit.expiryDate = new Date();
    permit.expiryDate.setFullYear(permit.expiryDate.getFullYear() + 1); // Valid for 1 year

    // Update land status
    await this.landService.update(permit.land.id, {
      status: LandStatus.REGISTERED,
    });

    const approvedPermit = await this.permitRepository.save(permit);

    // Send notification
    await this.notificationsService.sendNotification(
      permit.applicant.id,
      NotificationType.PERMIT_APPROVED,
      {
        permitId: approvedPermit.id,
        landId: permit.land.id,
        plotNumber: permit.land.plotNumber,
        constructionType: permit.constructionType,
      }
    );

    return approvedPermit;
  }

  async reject(id: string, reason: string): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    permit.status = PermitStatus.REJECTED;
    permit.rejectionReason = reason;

    // Update land status
    await this.landService.update(permit.land.id, {
      status: LandStatus.REGISTERED,
    });

    return this.permitRepository.save(permit);
  }

  async findByStatus(status: PermitStatus): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      where: { status },
      relations: ['land', 'applicant'],
    });
  }

  async findByApplicant(applicantId: string): Promise<ConstructionPermit[]> {
    return this.permitRepository.find({
      where: { applicant: { id: applicantId } },
      relations: ['land', 'applicant'],
    });
  }

  async recordInspection(id: string, report: string): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    permit.inspectionReport = report;
    permit.inspectionDate = new Date();

    return this.permitRepository.save(permit);
  }

  async updateFeeStatus(id: string, paid: boolean): Promise<ConstructionPermit> {
    const permit = await this.findOne(id);

    permit.feesPaid = paid;

    return this.permitRepository.save(permit);
  }
} 