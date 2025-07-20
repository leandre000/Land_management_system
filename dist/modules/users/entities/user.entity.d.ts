export declare enum UserRole {
    ADMIN = "ADMIN",
    LAND_OFFICER = "LAND_OFFICER",
    CITIZEN = "CITIZEN"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    address?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    get fullName(): string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
