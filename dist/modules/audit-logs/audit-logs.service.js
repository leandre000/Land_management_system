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
exports.AuditLogsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audit_log_entity_1 = require("./entities/audit-log.entity");
let AuditLogsService = class AuditLogsService {
    auditLogRepository;
    constructor(auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }
    async createLog(dto) {
        const auditLog = this.auditLogRepository.create({
            ...dto,
            createdAt: new Date(),
        });
        return this.auditLogRepository.save(auditLog);
    }
    async findByEntity(entityType, entityId) {
        return this.auditLogRepository.find({
            where: { entityType, entityId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByUser(userId) {
        return this.auditLogRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByAction(action) {
        return this.auditLogRepository.find({
            where: { action },
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(limit = 100, offset = 0) {
        const [logs, total] = await this.auditLogRepository.findAndCount({
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
        return { logs, total };
    }
    async findRecent(hours = 24) {
        const since = new Date();
        since.setHours(since.getHours() - hours);
        return this.auditLogRepository.find({
            where: {
                createdAt: since,
            },
            order: { createdAt: 'DESC' },
        });
    }
};
exports.AuditLogsService = AuditLogsService;
exports.AuditLogsService = AuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditLogsService);
//# sourceMappingURL=audit-logs.service.js.map