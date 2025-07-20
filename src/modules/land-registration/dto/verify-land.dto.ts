import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class VerifyLandDto {
  @ApiProperty({ description: 'Verification status' })
  @IsBoolean()
  @IsNotEmpty()
  isVerified: boolean;

  @ApiProperty({ description: 'Verification comments' })
  @IsString()
  @IsNotEmpty()
  comments: string;
} 