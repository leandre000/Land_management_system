import { CreateLandRegistrationDto } from './create-land-registration.dto';
import { LandStatus } from '../entities/land.entity';
declare const UpdateLandRegistrationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLandRegistrationDto>>;
export declare class UpdateLandRegistrationDto extends UpdateLandRegistrationDto_base {
    status?: LandStatus;
}
export {};
