"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandTaxesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const land_taxes_service_1 = require("./land-taxes.service");
const create_assessment_dto_1 = require("./dto/create-assessment.dto");
const record_payment_dto_1 = require("./dto/record-payment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../common/enums/user-role.enum");
const tax_assessment_entity_1 = require("./entities/tax-assessment.entity");
let LandTaxesController = class LandTaxesController {
    landTaxesService;
    constructor(landTaxesService) {
        this.landTaxesService = landTaxesService;
    }
    createAssessment(createAssessmentDto, req) {
        return this.landTaxesService.create(createAssessmentDto, req.user);
    }
    findAll() {
        return this.landTaxesService.findAll();
    }
    getOverdueTaxes() {
        return this.landTaxesService.getOverdueTaxes();
    }
    findMyTaxes(req) {
        return this.landTaxesService.findByOwner(req.user.id);
    }
    findOne(id) {
        return this.landTaxesService.findOne(id);
    }
    findByLand(landId) {
        return this.landTaxesService.findByLand(landId);
    }
    recordPayment(id, recordPaymentDto) {
        return this.landTaxesService.recordPayment(id, recordPaymentDto);
    }
};
exports.LandTaxesController = LandTaxesController;
__decorate([
    (0, common_1.Post)('assessments'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.TAX_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new tax assessment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Assessment created successfully', type: tax_assessment_entity_1.TaxAssessment }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assessment_dto_1.CreateAssessmentDto, Object]),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "createAssessment", null);
__decorate([
    (0, common_1.Get)('assessments'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.TAX_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tax assessments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all tax assessments', type: [tax_assessment_entity_1.TaxAssessment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('assessments/overdue'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.TAX_OFFICER),
    (0, swagger_1.ApiOperation)({ summary: 'Get all overdue tax assessments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all overdue tax assessments', type: [tax_assessment_entity_1.TaxAssessment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "getOverdueTaxes", null);
__decorate([
    (0, common_1.Get)('assessments/my-taxes'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s tax assessments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return user\'s tax assessments', type: [tax_assessment_entity_1.TaxAssessment] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "findMyTaxes", null);
__decorate([
    (0, common_1.Get)('assessments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tax assessment by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the tax assessment', type: tax_assessment_entity_1.TaxAssessment }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('assessments/land/:landId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tax assessments by land id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return tax assessments for the land', type: [tax_assessment_entity_1.TaxAssessment] }),
    __param(0, (0, common_1.Param)('landId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "findByLand", null);
__decorate([
    (0, common_1.Post)('assessments/:id/payments'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.CITIZEN),
    (0, swagger_1.ApiOperation)({ summary: 'Record a tax payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment recorded successfully', type: tax_assessment_entity_1.TaxAssessment }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, record_payment_dto_1.RecordPaymentDto]),
    __metadata("design:returntype", void 0)
], LandTaxesController.prototype, "recordPayment", null);
exports.LandTaxesController = LandTaxesController = __decorate([
    (0, swagger_1.ApiTags)('land-taxes'),
    (0, common_1.Controller)('land-taxes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [land_taxes_service_1.LandTaxesService])
], LandTaxesController);
//# sourceMappingURL=land-taxes.controller.js.map