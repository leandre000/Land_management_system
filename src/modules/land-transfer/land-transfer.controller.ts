import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LandTransferService } from './land-transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApproveTransferDto } from './dto/approve-transfer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { LandTransfer } from './entities/land-transfer.entity';

@ApiTags('land-transfer')
@Controller('land-transfer')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class LandTransferController {
  constructor(private readonly landTransferService: LandTransferService) {}

  @Post()
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Create a new land transfer request' })
  @ApiResponse({ status: 201, description: 'Transfer request created successfully', type: LandTransfer })
  create(@Body() createTransferDto: CreateTransferDto, @Request() req) {
    return this.landTransferService.create(createTransferDto, req.user);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get all transfer requests' })
  @ApiResponse({ status: 200, description: 'Return all transfer requests', type: [LandTransfer] })
  findAll() {
    return this.landTransferService.findAll();
  }

  @Get('my-transfers')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get user\'s transfer requests' })
  @ApiResponse({ status: 200, description: 'Return user\'s transfer requests', type: [LandTransfer] })
  findMyTransfers(@Request() req) {
    return this.landTransferService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transfer request by id' })
  @ApiResponse({ status: 200, description: 'Return the transfer request', type: LandTransfer })
  findOne(@Param('id') id: string) {
    return this.landTransferService.findOne(id);
  }

  @Patch(':id/approve')
  @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Approve or reject transfer request' })
  @ApiResponse({ status: 200, description: 'Transfer request processed successfully', type: LandTransfer })
  approve(
    @Param('id') id: string,
    @Body() approveTransferDto: ApproveTransferDto,
    @Request() req,
  ) {
    return this.landTransferService.approve(id, approveTransferDto, req.user);
  }

  @Patch(':id/cancel')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Cancel transfer request' })
  @ApiResponse({ status: 200, description: 'Transfer request cancelled successfully', type: LandTransfer })
  cancel(@Param('id') id: string, @Request() req) {
    return this.landTransferService.cancel(id, req.user);
  }
} 