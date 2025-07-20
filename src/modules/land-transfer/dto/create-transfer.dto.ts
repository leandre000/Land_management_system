import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsObject, IsOptional, IsUUID } from 'class-validator';

export class CreateTransferDto {
  @ApiProperty({ description: 'ID of the land to transfer' })
  @IsUUID()
  @IsNotEmpty()
  landId: string;

  @ApiProperty({ description: 'ID of the user to transfer the land to' })
  @IsUUID()
  @IsNotEmpty()
  toOwnerId: string;

  @ApiProperty({ description: 'Transfer amount' })
  @IsNumber()
  @IsNotEmpty()
  transferAmount: number;

  @ApiPropertyOptional({ description: 'Transfer documents' })
  @IsObject()
  @IsOptional()
  documents?: object;

  @ApiPropertyOptional({ description: 'Reason for transfer' })
  @IsString()
  @IsOptional()
  reason?: string;
} 