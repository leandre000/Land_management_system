import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandTransfer, TransferStatus } from './entities/land-transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { NotificationsService, NotificationType } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { LandStatus } from '../land-registration/entities/land.entity';

@Injectable()
export class LandTransferService {
  constructor(
    @InjectRepository(LandTransfer)
    private readonly transferRepository: Repository<LandTransfer>,
    private readonly landService: LandRegistrationService,
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTransferDto: CreateTransferDto): Promise<LandTransfer> {
    const [land, fromOwner, toOwner] = await Promise.all([
      this.landService.findOne(createTransferDto.landId),
      this.usersService.findOne(createTransferDto.fromOwnerId),
      this.usersService.findOne(createTransferDto.toOwnerId),
    ]);

    if (land.status === LandStatus.UNDER_DISPUTE) {
      throw new ConflictException('Cannot transfer land that is under dispute');
    }

    if (land.status === LandStatus.PENDING_CONSTRUCTION) {
      throw new ConflictException('Cannot transfer land with pending construction permit');
    }

    // Create transfer without saving
    const transfer = this.transferRepository.create({
      ...createTransferDto,
      land,
      fromOwner,
      toOwner,
      status: TransferStatus.PENDING,
    });

    const savedTransfer = await this.transferRepository.save(transfer);

    // Update land status
    await this.landService.update(land.id, {
      status: LandStatus.PENDING_TRANSFER,
    } as any); // Using type assertion as a temporary fix

    // Send notifications
    await Promise.all([
      this.notificationsService.sendNotification(
        fromOwner.id,
        NotificationType.TRANSFER_INITIATED,
        {
          transferId: savedTransfer.id,
          landId: land.id,
          plotNumber: land.plotNumber,
          toOwnerName: toOwner.fullName,
        }
      ),
      this.notificationsService.sendNotification(
        toOwner.id,
        NotificationType.TRANSFER_PENDING_APPROVAL,
        {
          transferId: savedTransfer.id,
          landId: land.id,
          plotNumber: land.plotNumber,
          fromOwnerName: fromOwner.fullName,
        }
      ),
    ]);

    return savedTransfer;
  }

  async findAll(): Promise<LandTransfer[]> {
    return this.transferRepository.find({
      relations: ['land', 'fromOwner', 'toOwner'],
    });
  }

  async findOne(id: string): Promise<LandTransfer> {
    const transfer = await this.transferRepository.findOne({
      where: { id },
      relations: ['land', 'fromOwner', 'toOwner'],
    });

    if (!transfer) {
      throw new NotFoundException(`Land transfer with ID ${id} not found`);
    }

    return transfer;
  }

  async update(id: string, updateTransferDto: UpdateTransferDto): Promise<LandTransfer> {
    const transfer = await this.findOne(id);

    Object.assign(transfer, updateTransferDto);

    return this.transferRepository.save(transfer);
  }

  async remove(id: string): Promise<void> {
    const transfer = await this.findOne(id);
    await this.transferRepository.remove(transfer);
  }

  async approve(id: string): Promise<LandTransfer> {
    const transfer = await this.findOne(id);

    transfer.status = TransferStatus.APPROVED;
    transfer.approvalDate = new Date();

    // Update land ownership and status
    await this.landService.update(transfer.land.id, {
      ownerId: transfer.toOwner.id,
      status: LandStatus.REGISTERED,
    } as any); // Using type assertion as a temporary fix

    const approvedTransfer = await this.transferRepository.save(transfer);

    // Send notifications
    await Promise.all([
      this.notificationsService.sendNotification(
        transfer.fromOwner.id,
        NotificationType.TRANSFER_APPROVED,
        {
          transferId: approvedTransfer.id,
          landId: transfer.land.id,
          plotNumber: transfer.land.plotNumber,
          toOwnerName: transfer.toOwner.fullName,
        }
      ),
      this.notificationsService.sendNotification(
        transfer.toOwner.id,
        NotificationType.TRANSFER_COMPLETED,
        {
          transferId: approvedTransfer.id,
          landId: transfer.land.id,
          plotNumber: transfer.land.plotNumber,
          fromOwnerName: transfer.fromOwner.fullName,
        }
      ),
    ]);

    return approvedTransfer;
  }

  async reject(id: string, reason: string): Promise<LandTransfer> {
    const transfer = await this.findOne(id);

    transfer.status = TransferStatus.REJECTED;
    transfer.rejectionReason = reason;

    // Update land status back to registered
    await this.landService.update(transfer.land.id, {
      status: LandStatus.REGISTERED,
    } as any); // Using type assertion as a temporary fix

    const rejectedTransfer = await this.transferRepository.save(transfer);

    // Send notifications
    await Promise.all([
      this.notificationsService.sendNotification(
        transfer.fromOwner.id,
        NotificationType.TRANSFER_REJECTED,
        {
          transferId: rejectedTransfer.id,
          landId: transfer.land.id,
          plotNumber: transfer.land.plotNumber,
          reason,
        }
      ),
      this.notificationsService.sendNotification(
        transfer.toOwner.id,
        NotificationType.TRANSFER_REJECTED,
        {
          transferId: rejectedTransfer.id,
          landId: transfer.land.id,
          plotNumber: transfer.land.plotNumber,
          reason,
        }
      ),
    ]);

    return rejectedTransfer;
  }

  async findByStatus(status: TransferStatus): Promise<LandTransfer[]> {
    return this.transferRepository.find({
      where: { status },
      relations: ['land', 'fromOwner', 'toOwner'],
    });
  }

  async findByOwner(ownerId: string): Promise<LandTransfer[]> {
    return this.transferRepository.find({
      where: [
        { fromOwner: { id: ownerId } },
        { toOwner: { id: ownerId } },
      ],
      relations: ['land', 'fromOwner', 'toOwner'],
    });
  }
} 