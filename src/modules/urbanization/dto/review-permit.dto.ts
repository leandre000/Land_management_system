import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsArray, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewPermitDto {
  @ApiProperty({ description: 'Whether to approve or reject the permit' })
  @IsBoolean()
  @IsNotEmpty()
  approved: boolean;

  @ApiProperty({ description: 'Review comments' })
  @IsString()
  @IsNotEmpty()
  reviewComments: string;

  @ApiPropertyOptional({ description: 'Conditions for approval' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  conditions?: string[] = [];

  @ApiPropertyOptional({ description: 'Whether inspection is required' })
  @IsBoolean()
  @IsOptional()
  requiresInspection?: boolean = false;

  @ApiPropertyOptional({ description: 'Permit fee' })
  @IsNumber()
  @IsOptional()
  permitFee?: number = 0;

  @ApiPropertyOptional({ description: 'Permit expiry date' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  expiryDate?: Date = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // Default 1 year
} 