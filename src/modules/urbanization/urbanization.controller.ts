import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UrbanizationService } from './urbanization.service';
import { CreatePermitDto } from './dto/create-permit.dto';
import { ReviewPermitDto } from './dto/review-permit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ConstructionPermit } from './entities/construction-permit.entity';

@ApiTags('urbanization')
@Controller('urbanization')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UrbanizationController {
  constructor(private readonly urbanizationService: UrbanizationService) {}

  @Post('permits')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Apply for a construction permit' })
  @ApiResponse({ status: 201, description: 'Permit application submitted successfully', type: ConstructionPermit })
  create(@Body() createPermitDto: CreatePermitDto, @Request() req) {
    return this.urbanizationService.create(createPermitDto, req.user);
  }

  @Get('permits')
  @Roles(UserRole.ADMIN, UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Get all construction permits' })
  @ApiResponse({ status: 200, description: 'Return all permits', type: [ConstructionPermit] })
  findAll() {
    return this.urbanizationService.findAll();
  }

  @Get('permits/pending')
  @Roles(UserRole.ADMIN, UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Get all pending permits' })
  @ApiResponse({ status: 200, description: 'Return all pending permits', type: [ConstructionPermit] })
  getPendingPermits() {
    return this.urbanizationService.getPendingPermits();
  }

  @Get('permits/approved')
  @Roles(UserRole.ADMIN, UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Get all approved permits' })
  @ApiResponse({ status: 200, description: 'Return all approved permits', type: [ConstructionPermit] })
  getApprovedPermits() {
    return this.urbanizationService.getApprovedPermits();
  }

  @Get('permits/my-permits')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get user\'s permits' })
  @ApiResponse({ status: 200, description: 'Return user\'s permits', type: [ConstructionPermit] })
  findMyPermits(@Request() req) {
    return this.urbanizationService.findByUser(req.user.id);
  }

  @Get('permits/:id')
  @ApiOperation({ summary: 'Get permit by id' })
  @ApiResponse({ status: 200, description: 'Return the permit', type: ConstructionPermit })
  findOne(@Param('id') id: string) {
    return this.urbanizationService.findOne(id);
  }

  @Patch('permits/:id/review')
  @Roles(UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Review permit application' })
  @ApiResponse({ status: 200, description: 'Permit reviewed successfully', type: ConstructionPermit })
  review(
    @Param('id') id: string,
    @Body() reviewPermitDto: ReviewPermitDto,
    @Request() req,
  ) {
    return this.urbanizationService.review(id, reviewPermitDto, req.user);
  }

  @Post('permits/:id/payment')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Record permit fee payment' })
  @ApiResponse({ status: 200, description: 'Payment recorded successfully', type: ConstructionPermit })
  recordPayment(@Param('id') id: string) {
    return this.urbanizationService.recordPayment(id);
  }

  @Post('permits/:id/inspection')
  @Roles(UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Schedule permit inspection' })
  @ApiResponse({ status: 200, description: 'Inspection scheduled successfully', type: ConstructionPermit })
  scheduleInspection(
    @Param('id') id: string,
    @Body('date') date: Date,
  ) {
    return this.urbanizationService.scheduleInspection(id, date);
  }

  @Post('permits/:id/inspection-report')
  @Roles(UserRole.CONSTRUCTION_OFFICER)
  @ApiOperation({ summary: 'Submit inspection report' })
  @ApiResponse({ status: 200, description: 'Inspection report submitted successfully', type: ConstructionPermit })
  submitInspectionReport(
    @Param('id') id: string,
    @Body('report') report: string,
  ) {
    return this.urbanizationService.submitInspectionReport(id, report);
  }
} 