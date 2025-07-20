import { PartialType } from '@nestjs/swagger';
import { CreateLandDto } from './create-land.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { LandStatus } from '../entities/land.entity';

export class UpdateLandDto extends PartialType(CreateLandDto) {
  @IsEnum(LandStatus)
  @IsOptional()
  status?: LandStatus;
} 