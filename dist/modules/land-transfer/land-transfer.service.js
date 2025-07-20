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
exports.LandTransferService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const land_transfer_entity_1 = require("./entities/land-transfer.entity");
const land_registration_service_1 = require("../land-registration/land-registration.service");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
const land_entity_1 = require("../land-registration/entities/land.entity");
let LandTransferService = class LandTransferService {
    transferRepository;
    landService;
    notificationsService;
    usersService;
    constructor(transferRepository, landService, notificationsService, usersService) {
        this.transferRepository = transferRepository;
        this.landService = landService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async create(createTransferDto) {
        const [land, fromOwner, toOwner] = await Promise.all([
            this.landService.findOne(createTransferDto.landId),
            this.usersService.findOne(createTransferDto.fromOwnerId),
            this.usersService.findOne(createTransferDto.toOwnerId),
        ]);
        if (land.status === land_entity_1.LandStatus.UNDER_DISPUTE) {
            throw new common_1.ConflictException('Cannot transfer land that is under dispute');
        }
        if (land.status === land_entity_1.LandStatus.PENDING_CONSTRUCTION) {
            throw new common_1.ConflictException('Cannot transfer land with pending construction permit');
        }
        const transfer = this.transferRepository.create({
            ...createTransferDto,
            land,
            fromOwner,
            toOwner,
            status: land_transfer_entity_1.TransferStatus.PENDING,
        });
        const savedTransfer = await this.transferRepository.save(transfer);
        await this.landService.update(land.id, {
            status: land_entity_1.LandStatus.PENDING_TRANSFER,
        });
        await Promise.all([
            this.notificationsService.sendNotification(fromOwner.id, notifications_service_1.NotificationType.TRANSFER_INITIATED, {
                transferId: savedTransfer.id,
                landId: land.id,
                plotNumber: land.plotNumber,
                toOwnerName: toOwner.fullName,
            }),
            this.notificationsService.sendNotification(toOwner.id, notifications_service_1.NotificationType.TRANSFER_PENDING_APPROVAL, {
                transferId: savedTransfer.id,
                landId: land.id,
                plotNumber: land.plotNumber,
                fromOwnerName: fromOwner.fullName,
            }),
        ]);
        return savedTransfer;
    }
    async findAll() {
        return this.transferRepository.find({
            relations: ['land', 'fromOwner', 'toOwner'],
        });
    }
    async findOne(id) {
        const transfer = await this.transferRepository.findOne({
            where: { id },
            relations: ['land', 'fromOwner', 'toOwner'],
        });
        if (!transfer) {
            throw new common_1.NotFoundException(`Land transfer with ID ${id} not found`);
        }
        return transfer;
    }
    async update(id, updateTransferDto) {
        const transfer = await this.findOne(id);
        Object.assign(transfer, updateTransferDto);
        return this.transferRepository.save(transfer);
    }
    async remove(id) {
        const transfer = await this.findOne(id);
        await this.transferRepository.remove(transfer);
    }
    async approve(id) {
        const transfer = await this.findOne(id);
        transfer.status = land_transfer_entity_1.TransferStatus.APPROVED;
        transfer.approvalDate = new Date();
        await this.landService.update(transfer.land.id, {
            ownerId: transfer.toOwner.id,
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const approvedTransfer = await this.transferRepository.save(transfer);
        await Promise.all([
            this.notificationsService.sendNotification(transfer.fromOwner.id, notifications_service_1.NotificationType.TRANSFER_APPROVED, {
                transferId: approvedTransfer.id,
                landId: transfer.land.id,
                plotNumber: transfer.land.plotNumber,
                toOwnerName: transfer.toOwner.fullName,
            }),
            this.notificationsService.sendNotification(transfer.toOwner.id, notifications_service_1.NotificationType.TRANSFER_COMPLETED, {
                transferId: approvedTransfer.id,
                landId: transfer.land.id,
                plotNumber: transfer.land.plotNumber,
                fromOwnerName: transfer.fromOwner.fullName,
            }),
        ]);
        return approvedTransfer;
    }
    async reject(id, reason) {
        const transfer = await this.findOne(id);
        transfer.status = land_transfer_entity_1.TransferStatus.REJECTED;
        transfer.rejectionReason = reason;
        await this.landService.update(transfer.land.id, {
            status: land_entity_1.LandStatus.REGISTERED,
        });
        const rejectedTransfer = await this.transferRepository.save(transfer);
        await Promise.all([
            this.notificationsService.sendNotification(transfer.fromOwner.id, notifications_service_1.NotificationType.TRANSFER_REJECTED, {
                transferId: rejectedTransfer.id,
                landId: transfer.land.id,
                plotNumber: transfer.land.plotNumber,
                reason,
            }),
            this.notificationsService.sendNotification(transfer.toOwner.id, notifications_service_1.NotificationType.TRANSFER_REJECTED, {
                transferId: rejectedTransfer.id,
                landId: transfer.land.id,
                plotNumber: transfer.land.plotNumber,
                reason,
            }),
        ]);
        return rejectedTransfer;
    }
    async findByStatus(status) {
        return this.transferRepository.find({
            where: { status },
            relations: ['land', 'fromOwner', 'toOwner'],
        });
    }
    async findByOwner(ownerId) {
        return this.transferRepository.find({
            where: [
                { fromOwner: { id: ownerId } },
                { toOwner: { id: ownerId } },
            ],
            relations: ['land', 'fromOwner', 'toOwner'],
        });
    }
};
exports.LandTransferService = LandTransferService;
exports.LandTransferService = LandTransferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_transfer_entity_1.LandTransfer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], LandTransferService);
//# sourceMappingURL=land-transfer.service.js.map