import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssessmentDto {
  @ApiProperty({ description: 'ID of the land to assess' })
  @IsUUID()
  @IsNotEmpty()
  landId: string;

  @ApiProperty({ description: 'Assessed value of the land' })
  @IsNumber()
  @IsNotEmpty()
  assessedValue: number;

  @ApiProperty({ description: 'Tax rate (percentage)' })
  @IsNumber()
  @IsNotEmpty()
  taxRate: number;

  @ApiProperty({ description: 'Due date for tax payment' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsString()
  @IsOptional()
  notes?: string;
} 