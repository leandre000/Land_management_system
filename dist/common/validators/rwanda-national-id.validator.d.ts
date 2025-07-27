import { ValidationOptions } from 'class-validator';
export declare function IsRwandaNationalId(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
export declare function validateRwandaNationalId(id: string): boolean;
export declare function formatRwandaNationalId(id: string): string;
export declare function generateSampleRwandaId(): string;
