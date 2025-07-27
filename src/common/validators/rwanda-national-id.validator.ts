import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRwandaNationalId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRwandaNationalId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return validateRwandaNationalId(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Rwanda National ID (16 digits: 1YYYY7NNNNNNNC)`;
        },
      },
    });
  };
}

export function validateRwandaNationalId(id: string): boolean {
  if (!id || typeof id !== 'string') {
    return false;
  }

  // Remove any spaces or hyphens
  const cleanId = id.replace(/[\s-]/g, '');

  // Check if it's exactly 16 digits
  if (!/^\d{16}$/.test(cleanId)) {
    return false;
  }

  // Check format: 1YYYY7NNNNNNNC
  // First digit must be 1
  if (cleanId[0] !== '1') {
    return false;
  }

  // Extract year (positions 1-4)
  const year = parseInt(cleanId.substring(1, 5));
  const currentYear = new Date().getFullYear();
  
  // Year should be reasonable (between 1900 and current year)
  if (year < 1900 || year > currentYear) {
    return false;
  }

  // Position 5 should be 7 (standard format)
  if (cleanId[5] !== '7') {
    return false;
  }

  // Validate check digit (last digit)
  const checkDigit = calculateRwandaIdCheckDigit(cleanId.substring(0, 15));
  if (parseInt(cleanId[15]) !== checkDigit) {
    return false;
  }

  return true;
}

function calculateRwandaIdCheckDigit(first15Digits: string): number {
  // Rwanda uses a weighted sum algorithm for check digit
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6];
  let sum = 0;

  for (let i = 0; i < 15; i++) {
    sum += parseInt(first15Digits[i]) * weights[i];
  }

  const remainder = sum % 10;
  return remainder === 0 ? 0 : 10 - remainder;
}

export function formatRwandaNationalId(id: string): string {
  if (!id) return '';
  
  const cleanId = id.replace(/[\s-]/g, '');
  if (cleanId.length !== 16) return id;
  
  // Format as: 1 YYYY 7NNNNNNN C
  return `${cleanId.substring(0, 1)} ${cleanId.substring(1, 5)} ${cleanId.substring(5, 13)} ${cleanId.substring(13, 16)}`;
}

export function generateSampleRwandaId(): string {
  const currentYear = new Date().getFullYear();
  const birthYear = Math.floor(Math.random() * (currentYear - 1970)) + 1970;
  const sequence = Math.floor(Math.random() * 99999999).toString().padStart(8, '0');
  
  const first15 = `1${birthYear}7${sequence}`;
  const checkDigit = calculateRwandaIdCheckDigit(first15);
  
  return `${first15}${checkDigit}`;
} 