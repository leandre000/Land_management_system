import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConflictResolutionService } from './conflict-resolution.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { LandDispute } from './entities/land-dispute.entity';

@ApiTags('conflict-resolution')
@Controller('conflict-resolution')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ConflictResolutionController {
  constructor(private readonly conflictResolutionService: ConflictResolutionService) {}

  @Post('disputes')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Create a new land dispute' })
  @ApiResponse({ status: 201, description: 'Dispute created successfully', type: LandDispute })
  create(@Body() createDisputeDto: CreateDisputeDto, @Request() req) {
    return this.conflictResolutionService.create(createDisputeDto, req.user);
  }

  @Get('disputes')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get all disputes' })
  @ApiResponse({ status: 200, description: 'Return all disputes', type: [LandDispute] })
  findAll() {
    return this.conflictResolutionService.findAll();
  }

  @Get('disputes/active')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get all active disputes' })
  @ApiResponse({ status: 200, description: 'Return all active disputes', type: [LandDispute] })
  getActiveDisputes() {
    return this.conflictResolutionService.getActiveDisputes();
  }

  @Get('disputes/resolved')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get all resolved disputes' })
  @ApiResponse({ status: 200, description: 'Return all resolved disputes', type: [LandDispute] })
  getResolvedDisputes() {
    return this.conflictResolutionService.getResolvedDisputes();
  }

  @Get('disputes/my-disputes')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get user\'s disputes' })
  @ApiResponse({ status: 200, description: 'Return user\'s disputes', type: [LandDispute] })
  findMyDisputes(@Request() req) {
    return this.conflictResolutionService.findByUser(req.user.id);
  }

  @Get('disputes/:id')
  @ApiOperation({ summary: 'Get dispute by id' })
  @ApiResponse({ status: 200, description: 'Return the dispute', type: LandDispute })
  findOne(@Param('id') id: string) {
    return this.conflictResolutionService.findOne(id);
  }

  @Patch('disputes/:id')
  @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Update dispute' })
  @ApiResponse({ status: 200, description: 'Dispute updated successfully', type: LandDispute })
  update(@Param('id') id: string, @Body() updateDisputeDto: UpdateDisputeDto) {
    return this.conflictResolutionService.update(id, updateDisputeDto);
  }

  @Post('disputes/:id/comments')
  @ApiOperation({ summary: 'Add comment to dispute' })
  @ApiResponse({ status: 200, description: 'Comment added successfully', type: LandDispute })
  addComment(@Param('id') id: string, @Body('comment') comment: string) {
    return this.conflictResolutionService.addComment(id, comment);
  }

  @Post('disputes/:id/field-visit')
  @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Schedule field visit' })
  @ApiResponse({ status: 200, description: 'Field visit scheduled successfully', type: LandDispute })
  scheduleFieldVisit(@Param('id') id: string, @Body('date') date: Date) {
    return this.conflictResolutionService.scheduleFieldVisit(id, date);
  }

  @Post('disputes/:id/field-visit-report')
  @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Submit field visit report' })
  @ApiResponse({ status: 200, description: 'Field visit report submitted successfully', type: LandDispute })
  submitFieldVisitReport(@Param('id') id: string, @Body('report') report: string) {
    return this.conflictResolutionService.submitFieldVisitReport(id, report);
  }
} 