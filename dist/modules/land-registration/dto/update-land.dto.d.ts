import { CreateLandDto } from './create-land.dto';
import { LandStatus } from '../entities/land.entity';
declare const UpdateLandDto_base: import("@nestjs/common").Type<Partial<CreateLandDto>>;
export declare class UpdateLandDto extends UpdateLandDto_base {
    status?: LandStatus;
}
export {};
