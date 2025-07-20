import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UrbanizationService } from './urbanization.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PermitStatus } from './entities/construction-permit.entity';

@ApiTags('Urbanization')
@Controller('urbanization')
@UseGuards(JwtAuthGuard)
export class UrbanizationController {
  constructor(private readonly urbanizationService: UrbanizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new construction permit' })
  async create(@Body() createPermitDto: CreatePermitDto) {
    return this.urbanizationService.create({
      ...createPermitDto,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all construction permits' })
  findAll() {
    return this.urbanizationService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending permits' })
  getPendingPermits() {
    return this.urbanizationService.findByStatus(PermitStatus.PENDING);
  }

  @Get('approved')
  @ApiOperation({ summary: 'Get approved permits' })
  getApprovedPermits() {
    return this.urbanizationService.findByStatus(PermitStatus.APPROVED);
  }

  @Get('applicant')
  @ApiOperation({ summary: 'Get permits by applicant' })
  findByApplicant(@Request() req) {
    return this.urbanizationService.findByApplicant(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a construction permit by ID' })
  findOne(@Param('id') id: string) {
    return this.urbanizationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a construction permit' })
  update(@Param('id') id: string, @Body() updatePermitDto: UpdatePermitDto) {
    return this.urbanizationService.update(id, updatePermitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a construction permit' })
  remove(@Param('id') id: string) {
    return this.urbanizationService.remove(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a construction permit' })
  approve(@Param('id') id: string) {
    return this.urbanizationService.approve(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a construction permit' })
  reject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.urbanizationService.reject(id, reason);
  }

  @Post(':id/inspection')
  @ApiOperation({ summary: 'Record inspection report' })
  recordInspection(
    @Param('id') id: string,
    @Body('report') report: string,
  ) {
    return this.urbanizationService.recordInspection(id, report);
  }

  @Post(':id/fees')
  @ApiOperation({ summary: 'Update fee payment status' })
  updateFeeStatus(
    @Param('id') id: string,
    @Body('paid') paid: boolean,
  ) {
    return this.urbanizationService.updateFeeStatus(id, paid);
  }
} 