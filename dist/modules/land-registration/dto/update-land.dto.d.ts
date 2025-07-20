import { CreateLandDto } from './create-land.dto';
import { LandStatus } from '../../../common/enums/land-status.enum';
import { User } from '../../users/entities/user.entity';
declare const UpdateLandDto_base: import("@nestjs/common").Type<Partial<CreateLandDto>>;
export declare class UpdateLandDto extends UpdateLandDto_base {
    status?: LandStatus;
    owner?: User;
}
export {};
