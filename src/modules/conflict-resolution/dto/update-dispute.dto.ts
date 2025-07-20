import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsArray, IsObject, IsOptional, IsUUID, IsDate } from 'class-validator';
import { DisputeStatus } from '../entities/land-dispute.entity';
import { Type } from 'class-transformer';

export class UpdateDisputeDto {
  @ApiPropertyOptional({ enum: DisputeStatus, description: 'Status of the dispute' })
  @IsEnum(DisputeStatus)
  @IsOptional()
  status?: DisputeStatus;

  @ApiPropertyOptional({ description: 'ID of the mediator' })
  @IsUUID()
  @IsOptional()
  mediatorId?: string;

  @ApiPropertyOptional({ description: 'Mediation date' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  mediationDate?: Date;

  @ApiPropertyOptional({ description: 'Resolution details' })
  @IsString()
  @IsOptional()
  resolution?: string;

  @ApiPropertyOptional({ description: 'Comments on the dispute' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  comments?: string[];

  @ApiPropertyOptional({ description: 'Field visit date' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  fieldVisitDate?: Date;

  @ApiPropertyOptional({ description: 'Field visit report' })
  @IsString()
  @IsOptional()
  fieldVisitReport?: string;

  @ApiPropertyOptional({ description: 'Additional evidence' })
  @IsObject()
  @IsOptional()
  evidence?: object;
} 