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
const users_service_1 = require("../users/users.service");
const land_status_enum_1 = require("../../common/enums/land-status.enum");
let LandTransferService = class LandTransferService {
    transferRepository;
    landService;
    usersService;
    constructor(transferRepository, landService, usersService) {
        this.transferRepository = transferRepository;
        this.landService = landService;
        this.usersService = usersService;
    }
    async create(createTransferDto, fromOwner) {
        const land = await this.landService.findOne(createTransferDto.landId);
        const toOwner = await this.usersService.findOne(createTransferDto.toOwnerId);
        if (land.owner.id !== fromOwner.id) {
            throw new common_1.ConflictException('You do not own this land');
        }
        if (!land.isVerified || land.status !== land_status_enum_1.LandStatus.REGISTERED) {
            throw new common_1.ConflictException('Land must be registered and verified before transfer');
        }
        const pendingTransfer = await this.transferRepository.findOne({
            where: {
                land: { id: land.id },
                status: land_transfer_entity_1.TransferStatus.PENDING,
            },
        });
        if (pendingTransfer) {
            throw new common_1.ConflictException('There is already a pending transfer for this land');
        }
        const transfer = this.transferRepository.create({
            land,
            fromOwner,
            toOwner,
            transferAmount: createTransferDto.transferAmount,
            documents: createTransferDto.documents,
            reason: createTransferDto.reason,
            status: land_transfer_entity_1.TransferStatus.PENDING,
        });
        await this.landService.update(land.id, { status: land_status_enum_1.LandStatus.PENDING_TRANSFER }, fromOwner);
        return this.transferRepository.save(transfer);
    }
    async findAll() {
        return this.transferRepository.find();
    }
    async findOne(id) {
        const transfer = await this.transferRepository.findOne({ where: { id } });
        if (!transfer) {
            throw new common_1.NotFoundException(`Transfer with ID "${id}" not found`);
        }
        return transfer;
    }
    async findByUser(userId) {
        return this.transferRepository.find({
            where: [
                { fromOwner: { id: userId } },
                { toOwner: { id: userId } },
            ],
        });
    }
    async approve(id, approveTransferDto, officer) {
        const transfer = await this.findOne(id);
        if (transfer.status !== land_transfer_entity_1.TransferStatus.PENDING) {
            throw new common_1.ConflictException('Transfer is not in pending status');
        }
        if (!approveTransferDto.approved && !approveTransferDto.rejectionReason) {
            throw new common_1.BadRequestException('Rejection reason is required when rejecting a transfer');
        }
        transfer.status = approveTransferDto.approved ? land_transfer_entity_1.TransferStatus.APPROVED : land_transfer_entity_1.TransferStatus.REJECTED;
        transfer.approvedBy = officer;
        transfer.approvalDate = new Date();
        transfer.rejectionReason = approveTransferDto.rejectionReason || '';
        if (approveTransferDto.approved) {
            await this.landService.update(transfer.land.id, {
                owner: transfer.toOwner,
                status: land_status_enum_1.LandStatus.REGISTERED,
            }, transfer.fromOwner);
        }
        else {
            await this.landService.update(transfer.land.id, { status: land_status_enum_1.LandStatus.REGISTERED }, transfer.fromOwner);
        }
        return this.transferRepository.save(transfer);
    }
    async cancel(id, user) {
        const transfer = await this.findOne(id);
        if (transfer.status !== land_transfer_entity_1.TransferStatus.PENDING) {
            throw new common_1.ConflictException('Only pending transfers can be cancelled');
        }
        if (transfer.fromOwner.id !== user.id) {
            throw new common_1.ConflictException('Only the owner can cancel the transfer');
        }
        transfer.status = land_transfer_entity_1.TransferStatus.CANCELLED;
        await this.landService.update(transfer.land.id, { status: land_status_enum_1.LandStatus.REGISTERED }, user);
        return this.transferRepository.save(transfer);
    }
};
exports.LandTransferService = LandTransferService;
exports.LandTransferService = LandTransferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(land_transfer_entity_1.LandTransfer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        land_registration_service_1.LandRegistrationService,
        users_service_1.UsersService])
], LandTransferService);
//# sourceMappingURL=land-transfer.service.js.map