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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = exports.ReportStatus = exports.ReportType = void 0;
const typeorm_1 = require("typeorm");
var ReportType;
(function (ReportType) {
    ReportType["WEEKLY_SUMMARY"] = "WEEKLY_SUMMARY";
    ReportType["MONTHLY_SUMMARY"] = "MONTHLY_SUMMARY";
    ReportType["GEO_ANALYTICS"] = "GEO_ANALYTICS";
    ReportType["TAX_SUMMARY"] = "TAX_SUMMARY";
})(ReportType || (exports.ReportType = ReportType = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["GENERATING"] = "GENERATING";
    ReportStatus["COMPLETED"] = "COMPLETED";
    ReportStatus["FAILED"] = "FAILED";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
let Report = class Report {
    id;
    type;
    status;
    title;
    description;
    data;
    filePath;
    fileSize;
    reportPeriodStart;
    reportPeriodEnd;
    createdAt;
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Report.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportType,
    }),
    __metadata("design:type", String)
], Report.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ReportStatus,
        default: ReportStatus.GENERATING,
    }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Report.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "filePath", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Number)
], Report.prototype, "fileSize", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Report.prototype, "reportPeriodStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Report.prototype, "reportPeriodEnd", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Report.prototype, "createdAt", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)('reports')
], Report);
//# sourceMappingURL=report.entity.js.map