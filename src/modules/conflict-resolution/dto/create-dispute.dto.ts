import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray, IsOptional, IsUUID } from 'class-validator';
import { DisputeType } from '../entities/land-dispute.entity';
import { User } from '../../users/entities/user.entity';

export class CreateDisputeDto {
  @ApiProperty({ description: 'ID of the land in dispute' })
  @IsUUID()
  @IsNotEmpty()
  landId: string;

  @ApiProperty({ description: 'ID of the complainant' })
  @IsUUID()
  @IsNotEmpty()
  complainantId: string;

  @ApiProperty({ description: 'IDs of the respondents' })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  respondentIds: string[];

  @ApiProperty({ enum: DisputeType, description: 'Type of dispute' })
  @IsEnum(DisputeType)
  @IsNotEmpty()
  type: DisputeType;

  @ApiProperty({ description: 'Description of the dispute' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'Evidence supporting the dispute' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  evidence?: string[];

  @ApiPropertyOptional({ description: 'Whether a field visit is required' })
  @IsOptional()
  requiresFieldVisit?: boolean;

  // These will be populated by the service
  complainant?: User;
  respondents?: User[];
} 