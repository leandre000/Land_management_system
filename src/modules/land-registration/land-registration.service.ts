import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Land, LandStatus } from './entities/land.entity';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class LandRegistrationService {
  constructor(
    @InjectRepository(Land)
    private readonly landRepository: Repository<Land>,
    private readonly rabbitMQService: RabbitMQService,
    private readonly usersService: UsersService,
  ) {}

  async create(createLandDto: CreateLandDto): Promise<Land> {
    const owner = await this.usersService.findOne(createLandDto.ownerId);
    
    const land = new Land();
    Object.assign(land, {
      ...createLandDto,
      owner,
      status: LandStatus.REGISTERED,
    });

    const savedLand = await this.landRepository.save(land);
    await this.rabbitMQService.handleLandRegistration(savedLand.id, savedLand);

    return savedLand;
  }

  async findAll(): Promise<Land[]> {
    return this.landRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: string): Promise<Land> {
    const land = await this.landRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!land) {
      throw new NotFoundException(`Land with ID ${id} not found`);
    }

    return land;
  }

  async update(id: string, updateLandDto: UpdateLandDto): Promise<Land> {
    const land = await this.findOne(id);

    if (updateLandDto.ownerId) {
      const newOwner = await this.usersService.findOne(updateLandDto.ownerId);
      land.owner = newOwner;
    }

    Object.assign(land, updateLandDto);
    const updatedLand = await this.landRepository.save(land);

    await this.rabbitMQService.handleLandUpdate(id, {
      ...updatedLand,
      changes: updateLandDto,
    });

    return updatedLand;
  }

  async remove(id: string): Promise<void> {
    const land = await this.findOne(id);
    await this.landRepository.remove(land);
  }

  async verify(id: string, verifiedBy: string): Promise<Land> {
    const land = await this.findOne(id);
    const verifier = await this.usersService.findOne(verifiedBy);

    land.isVerified = true;
    land.verifiedBy = verifier;
    land.verificationDate = new Date();

    const verifiedLand = await this.landRepository.save(land);
    await this.rabbitMQService.handleLandVerification(id, verifiedLand);

    return verifiedLand;
  }

  async findByOwner(ownerId: string): Promise<Land[]> {
    return this.landRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });
  }

  async findByStatus(status: LandStatus): Promise<Land[]> {
    return this.landRepository.find({
      where: { status },
      relations: ['owner'],
    });
  }
} 