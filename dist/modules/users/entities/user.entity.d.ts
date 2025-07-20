import { BaseEntity } from '../../../common/entities/base.entity';
import { UserRole } from '../../../common/enums/user-role.enum';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber: string;
    nationalId: string;
    isActive: boolean;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
