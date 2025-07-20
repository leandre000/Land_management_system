import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray, IsObject, IsOptional, IsUUID } from 'class-validator';
import { DisputeType } from '../entities/land-dispute.entity';

export class CreateDisputeDto {
  @ApiProperty({ description: 'ID of the land in dispute' })
  @IsUUID()
  @IsNotEmpty()
  landId: string;

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
  @IsObject()
  @IsOptional()
  evidence?: object;

  @ApiPropertyOptional({ description: 'List of witnesses' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  witnesses?: string[];

  @ApiPropertyOptional({ description: 'Whether a field visit is required' })
  @IsOptional()
  requiresFieldVisit?: boolean;
} 