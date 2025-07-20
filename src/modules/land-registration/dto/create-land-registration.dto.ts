import { IsString, IsNumber, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export class LocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  address: string;
}

export class BoundariesDto {
  @IsString()
  north: string;

  @IsString()
  south: string;

  @IsString()
  east: string;

  @IsString()
  west: string;
}

export class CreateLandRegistrationDto {
  @IsString()
  plotNumber: string;

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsNumber()
  area: number;

  @IsString()
  description: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => BoundariesDto)
  boundaries?: BoundariesDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  documents?: string[];

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsOptional()
  owner?: User;
} 