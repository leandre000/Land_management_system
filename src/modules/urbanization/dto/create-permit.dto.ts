import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsObject, IsOptional, IsUUID, IsDate, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ConstructionType } from '../entities/construction-permit.entity';

export class CreatePermitDto {
  @ApiProperty({ description: 'ID of the land for construction' })
  @IsUUID()
  @IsNotEmpty()
  landId: string;

  @ApiProperty({ enum: ConstructionType, description: 'Type of construction' })
  @IsEnum(ConstructionType)
  @IsNotEmpty()
  constructionType: ConstructionType;

  @ApiProperty({ description: 'Description of the construction project' })
  @IsString()
  @IsNotEmpty()
  projectDescription: string;

  @ApiProperty({ description: 'Estimated cost of construction' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  estimatedCost: number;

  @ApiProperty({ description: 'Total area of construction in square meters' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  totalArea: number;

  @ApiProperty({ description: 'Number of floors' })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  floors: number;

  @ApiProperty({ description: 'Architectural plans' })
  @IsObject()
  @IsNotEmpty()
  architecturalPlans: object;

  @ApiPropertyOptional({ description: 'Structural plans' })
  @IsObject()
  @IsOptional()
  structuralPlans?: object;

  @ApiProperty({ description: 'Proposed start date' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  proposedStartDate: Date;

  @ApiProperty({ description: 'Proposed end date' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  proposedEndDate: Date;
} 