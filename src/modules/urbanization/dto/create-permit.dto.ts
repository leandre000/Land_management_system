import { IsString, IsNumber, IsEnum, IsUUID, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConstructionType } from '../entities/construction-permit.entity';
import { User } from '../../users/entities/user.entity';

export class CreatePermitDto {
  @ApiProperty({ description: 'ID of the land for construction' })
  @IsUUID()
  landId: string;

  @ApiProperty({ description: 'ID of the permit applicant' })
  @IsUUID()
  applicantId: string;

  @ApiProperty({ enum: ConstructionType, description: 'Type of construction' })
  @IsEnum(ConstructionType)
  constructionType: ConstructionType;

  @ApiProperty({ description: 'Description of the construction project' })
  @IsString()
  projectDescription: string;

  @ApiProperty({ description: 'Estimated cost of construction' })
  @IsNumber()
  estimatedCost: number;

  @ApiPropertyOptional({ description: 'Supporting documents' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  documents?: string[];

  // These will be populated by the service
  applicant?: User;
} 