import { IsString, IsUUID, IsOptional, IsObject, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLandGeoJsonDto {
  @ApiPropertyOptional({ description: 'Owner ID (automatically set from JWT token if not provided)' })
  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @ApiProperty()
  @IsString()
  plotNumber: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  documents?: object;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  value?: number;

  @ApiProperty({
    description: 'GeoJSON Feature representing the land parcel polygon',
    example: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[[30.1, -1.9], [30.2, -1.9], [30.2, -1.8], [30.1, -1.8], [30.1, -1.9]]]
      },
      properties: {
        name: 'Sample Parcel'
      }
    }
  })
  @IsObject()
  geoJson: any;
} 