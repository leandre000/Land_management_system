import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Land } from './entities/land.entity';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { VerifyLandDto } from './dto/verify-land.dto';
import { User } from '../users/entities/user.entity';
import { LandStatus } from '../../common/enums/land-status.enum';

@Injectable()
export class LandRegistrationService {
  constructor(
    @InjectRepository(Land)
    private readonly landRepository: Repository<Land>,
  ) {}

  async create(createLandDto: CreateLandDto, owner: User): Promise<Land> {
    const existingLand = await this.landRepository.findOne({
      where: { plotNumber: createLandDto.plotNumber },
    });

    if (existingLand) {
      throw new ConflictException('Plot number already exists');
    }

    const land = this.landRepository.create({
      ...createLandDto,
      owner,
      status: LandStatus.PENDING_REGISTRATION,
    });

    return this.landRepository.save(land);
  }

  async findAll(): Promise<Land[]> {
    return this.landRepository.find();
  }

  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({ where: { id } });
    if (!land) {
      throw new NotFoundException(`Land with ID "${id}" not found`);
    }
    return land;
  }

  async findByOwner(ownerId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { owner: { id: ownerId } },
    });
  }

  async update(id: string, updateLandDto: UpdateLandDto, user: User): Promise<Land> {
    const land = await this.findOne(id);

    if (land.owner.id !== user.id) {
      throw new ConflictException('You are not authorized to update this land');
    }

    if (updateLandDto.plotNumber && updateLandDto.plotNumber !== land.plotNumber) {
      const existingLand = await this.landRepository.findOne({
        where: { plotNumber: updateLandDto.plotNumber },
      });
      if (existingLand) {
        throw new ConflictException('Plot number already exists');
      }
    }

    Object.assign(land, updateLandDto);
    return this.landRepository.save(land);
  }

  async verify(id: string, verifyLandDto: VerifyLandDto, verifier: User): Promise<Land> {
    const land = await this.findOne(id);

    if (land.isVerified) {
      throw new ConflictException('Land is already verified');
    }

    land.isVerified = verifyLandDto.isVerified;
    land.verifiedBy = verifier;
    land.verificationDate = new Date();
    land.status = verifyLandDto.isVerified ? LandStatus.REGISTERED : LandStatus.PENDING_REGISTRATION;

    return this.landRepository.save(land);
  }

  async remove(id: string, user: User): Promise<void> {
    const land = await this.findOne(id);

    if (land.owner.id !== user.id) {
      throw new ConflictException('You are not authorized to delete this land');
    }

    const result = await this.landRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Land with ID "${id}" not found`);
    }
  }
} 