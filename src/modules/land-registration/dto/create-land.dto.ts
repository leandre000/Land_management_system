import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateLandDto {
  @ApiProperty({ description: 'Title of the land' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Plot number of the land' })
  @IsString()
  @IsNotEmpty()
  plotNumber: string;

  @ApiProperty({ description: 'Area of the land in square meters' })
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @ApiProperty({ description: 'Location of the land' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Coordinates of the land (GeoJSON Point)' })
  @IsObject()
  @IsNotEmpty()
  coordinates: object;

  @ApiPropertyOptional({ description: 'Boundaries of the land', type: [String] })
  @IsArray()
  @IsOptional()
  boundaries?: string[];

  @ApiPropertyOptional({ description: 'Description of the land' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Documents related to the land' })
  @IsObject()
  @IsOptional()
  documents?: object;

  @ApiPropertyOptional({ description: 'Value of the land' })
  @IsNumber()
  @IsOptional()
  value?: number;
} 