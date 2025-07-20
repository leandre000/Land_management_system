import { IsString, IsNumber, IsUUID, IsObject, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLandDto {
  @ApiProperty({ description: 'ID of the land owner' })
  @IsUUID()
  ownerId: string;

  @ApiProperty({ description: 'Plot number of the land' })
  @IsString()
  plotNumber: string;

  @ApiProperty({ description: 'Location details' })
  @IsObject()
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  @ApiProperty({ description: 'Area in square meters' })
  @IsNumber()
  area: number;

  @ApiProperty({ description: 'Title of the land' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Land boundaries' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  boundaries?: string[];

  @ApiPropertyOptional({ description: 'Land description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Supporting documents' })
  @IsObject()
  @IsOptional()
  documents?: object;

  @ApiPropertyOptional({ description: 'Land value' })
  @IsNumber()
  @IsOptional()
  value?: number;
} 