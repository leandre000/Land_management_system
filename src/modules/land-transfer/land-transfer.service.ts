import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandTransfer, TransferStatus } from './entities/land-transfer.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApproveTransferDto } from './dto/approve-transfer.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { UsersService } from '../users/users.service';
import { LandStatus } from '../../common/enums/land-status.enum';

@Injectable()
export class LandTransferService {
  constructor(
    @InjectRepository(LandTransfer)
    private readonly transferRepository: Repository<LandTransfer>,
    private readonly landService: LandRegistrationService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTransferDto: CreateTransferDto, fromOwner: User): Promise<LandTransfer> {
    const land = await this.landService.findOne(createTransferDto.landId);
    const toOwner = await this.usersService.findOne(createTransferDto.toOwnerId);

    // Validate ownership
    if (land.owner.id !== fromOwner.id) {
      throw new ConflictException('You do not own this land');
    }

    // Check if land is registered and verified
    if (!land.isVerified || land.status !== LandStatus.REGISTERED) {
      throw new ConflictException('Land must be registered and verified before transfer');
    }

    // Check for pending transfers
    const pendingTransfer = await this.transferRepository.findOne({
      where: {
        land: { id: land.id },
        status: TransferStatus.PENDING,
      },
    });

    if (pendingTransfer) {
      throw new ConflictException('There is already a pending transfer for this land');
    }

    const transfer = this.transferRepository.create({
      land,
      fromOwner,
      toOwner,
      transferAmount: createTransferDto.transferAmount,
      documents: createTransferDto.documents,
      reason: createTransferDto.reason,
      status: TransferStatus.PENDING,
    });

    // Update land status
    await this.landService.update(land.id, { status: LandStatus.PENDING_TRANSFER }, fromOwner);

    return this.transferRepository.save(transfer);
  }

  async findAll(): Promise<LandTransfer[]> {
    return this.transferRepository.find();
  }

  async findOne(id: string): Promise<LandTransfer> {
    const transfer = await this.transferRepository.findOne({ where: { id } });
    if (!transfer) {
      throw new NotFoundException(`Transfer with ID "${id}" not found`);
    }
    return transfer;
  }

  async findByUser(userId: string): Promise<LandTransfer[]> {
    return this.transferRepository.find({
      where: [
        { fromOwner: { id: userId } },
        { toOwner: { id: userId } },
      ],
    });
  }

  async approve(id: string, approveTransferDto: ApproveTransferDto, officer: User): Promise<LandTransfer> {
    const transfer = await this.findOne(id);

    if (transfer.status !== TransferStatus.PENDING) {
      throw new ConflictException('Transfer is not in pending status');
    }

    if (!approveTransferDto.approved && !approveTransferDto.rejectionReason) {
      throw new BadRequestException('Rejection reason is required when rejecting a transfer');
    }

    transfer.status = approveTransferDto.approved ? TransferStatus.APPROVED : TransferStatus.REJECTED;
    transfer.approvedBy = officer;
    transfer.approvalDate = new Date();
    transfer.rejectionReason = approveTransferDto.rejectionReason || '';

    if (approveTransferDto.approved) {
      // Update land ownership and status
      await this.landService.update(
        transfer.land.id,
        {
          owner: transfer.toOwner,
          status: LandStatus.REGISTERED,
        },
        transfer.fromOwner,
      );
    } else {
      // Reset land status
      await this.landService.update(
        transfer.land.id,
        { status: LandStatus.REGISTERED },
        transfer.fromOwner,
      );
    }

    return this.transferRepository.save(transfer);
  }

  async cancel(id: string, user: User): Promise<LandTransfer> {
    const transfer = await this.findOne(id);

    if (transfer.status !== TransferStatus.PENDING) {
      throw new ConflictException('Only pending transfers can be cancelled');
    }

    if (transfer.fromOwner.id !== user.id) {
      throw new ConflictException('Only the owner can cancel the transfer');
    }

    transfer.status = TransferStatus.CANCELLED;

    // Reset land status
    await this.landService.update(
      transfer.land.id,
      { status: LandStatus.REGISTERED },
      user,
    );

    return this.transferRepository.save(transfer);
  }
} 