"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRwandaNationalId = IsRwandaNationalId;
exports.validateRwandaNationalId = validateRwandaNationalId;
exports.formatRwandaNationalId = formatRwandaNationalId;
exports.generateSampleRwandaId = generateSampleRwandaId;
const class_validator_1 = require("class-validator");
function IsRwandaNationalId(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isRwandaNationalId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return validateRwandaNationalId(value);
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid Rwanda National ID (16 digits: 1YYYY7NNNNNNNC)`;
                },
            },
        });
    };
}
function validateRwandaNationalId(id) {
    if (!id || typeof id !== 'string') {
        return false;
    }
    const cleanId = id.replace(/[\s-]/g, '');
    if (!/^\d{16}$/.test(cleanId)) {
        return false;
    }
    if (cleanId[0] !== '1') {
        return false;
    }
    const year = parseInt(cleanId.substring(1, 5));
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
        return false;
    }
    if (cleanId[5] !== '7') {
        return false;
    }
    const checkDigit = calculateRwandaIdCheckDigit(cleanId.substring(0, 15));
    if (parseInt(cleanId[15]) !== checkDigit) {
        return false;
    }
    return true;
}
function calculateRwandaIdCheckDigit(first15Digits) {
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6];
    let sum = 0;
    for (let i = 0; i < 15; i++) {
        sum += parseInt(first15Digits[i]) * weights[i];
    }
    const remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
}
function formatRwandaNationalId(id) {
    if (!id)
        return '';
    const cleanId = id.replace(/[\s-]/g, '');
    if (cleanId.length !== 16)
        return id;
    return `${cleanId.substring(0, 1)} ${cleanId.substring(1, 5)} ${cleanId.substring(5, 13)} ${cleanId.substring(13, 16)}`;
}
function generateSampleRwandaId() {
    const currentYear = new Date().getFullYear();
    const birthYear = Math.floor(Math.random() * (currentYear - 1970)) + 1970;
    const sequence = Math.floor(Math.random() * 99999999).toString().padStart(8, '0');
    const first15 = `1${birthYear}7${sequence}`;
    const checkDigit = calculateRwandaIdCheckDigit(first15);
    return `${first15}${checkDigit}`;
}
//# sourceMappingURL=rwanda-national-id.validator.js.map