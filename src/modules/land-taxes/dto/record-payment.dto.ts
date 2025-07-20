import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class RecordPaymentDto {
  @ApiProperty({ description: 'Amount paid' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'Payment details (transaction ID, method, etc.)' })
  @IsObject()
  @IsNotEmpty()
  paymentDetails: object;

  @ApiPropertyOptional({ description: 'Additional notes' })
  @IsOptional()
  notes?: string;
} 