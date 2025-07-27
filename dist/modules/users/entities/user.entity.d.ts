import { UserRole } from '../../../common/enums/user-role.enum';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    nationalId?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
