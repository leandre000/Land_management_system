import { PartialType } from '@nestjs/mapped-types';
import { CreatePermitDto } from './create-permit.dto';

export class UpdatePermitDto extends PartialType(CreatePermitDto) {} 