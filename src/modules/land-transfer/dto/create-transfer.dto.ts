import { IsString, IsNumber, IsUUID, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty({ description: 'ID of the land to transfer' })
  @IsUUID()
  landId: string;

  @ApiProperty({ description: 'ID of the current owner' })
  @IsUUID()
  fromOwnerId: string;

  @ApiProperty({ description: 'ID of the new owner' })
  @IsUUID()
  toOwnerId: string;

  @ApiProperty({ description: 'Transfer amount' })
  @IsNumber()
  transferAmount: number;

  @ApiPropertyOptional({ description: 'Supporting documents' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  documents?: string[];

  @ApiPropertyOptional({ description: 'Reason for transfer' })
  @IsString()
  @IsOptional()
  reason?: string;
} 