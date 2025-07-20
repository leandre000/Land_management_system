import { PartialType } from '@nestjs/swagger';
import { CreateLandDto } from './create-land.dto';
import { IsEnum, IsOptional, IsObject } from 'class-validator';
import { LandStatus } from '../../../common/enums/land-status.enum';
import { User } from '../../users/entities/user.entity';

export class UpdateLandDto extends PartialType(CreateLandDto) {
  @IsEnum(LandStatus)
  @IsOptional()
  status?: LandStatus;

  @IsObject()
  @IsOptional()
  owner?: User;
} 