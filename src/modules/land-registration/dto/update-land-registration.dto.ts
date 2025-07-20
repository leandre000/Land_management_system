import { PartialType } from '@nestjs/mapped-types';
import { CreateLandRegistrationDto } from './create-land-registration.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { LandStatus } from '../entities/land.entity';

export class UpdateLandRegistrationDto extends PartialType(CreateLandRegistrationDto) {
  @IsEnum(LandStatus)
  @IsOptional()
  status?: LandStatus;
} 