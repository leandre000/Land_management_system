import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { SettingType } from '../entities/system-setting.entity';

export class CreateSettingDto {
  @ApiProperty({ enum: SettingType, description: 'Type of setting' })
  @IsEnum(SettingType)
  @IsNotEmpty()
  type: SettingType;

  @ApiProperty({ description: 'Setting key' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'Setting value' })
  @IsObject()
  @IsNotEmpty()
  value: any;

  @ApiPropertyOptional({ description: 'Setting description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Whether the setting is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Additional metadata' })
  @IsObject()
  @IsOptional()
  metadata?: object;
} 