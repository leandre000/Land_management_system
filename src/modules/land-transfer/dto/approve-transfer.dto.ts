import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ApproveTransferDto {
  @ApiProperty({ description: 'Whether to approve or reject the transfer' })
  @IsBoolean()
  @IsNotEmpty()
  approved: boolean;

  @ApiPropertyOptional({ description: 'Reason for rejection (required if rejected)' })
  @IsString()
  @IsOptional()
  rejectionReason?: string;
} 