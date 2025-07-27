import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../../common/enums/user-role.enum';
import { IsRwandaNationalId } from '../../../common/validators/rwanda-national-id.validator';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user account' })
  @IsString()
  password: string;

  @ApiPropertyOptional({ description: 'Phone number of the user' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ description: 'Address of the user' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ 
    description: 'Rwanda National ID (16 digits: 1YYYY7NNNNNNNC)',
    example: '1199870123456789'
  })
  @IsRwandaNationalId()
  @IsOptional()
  nationalId?: string;

  @ApiPropertyOptional({ description: 'Role of the user', enum: UserRole, default: UserRole.CITIZEN })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
} 