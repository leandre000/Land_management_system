import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ConflictResolutionService } from './conflict-resolution.service';
import { CreateDisputeDto } from './dto/create-dispute.dto';
import { UpdateDisputeDto } from './dto/update-dispute.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DisputeStatus } from './entities/land-dispute.entity';

@ApiTags('Conflict Resolution')
@Controller('conflict-resolution')
@UseGuards(JwtAuthGuard)
export class ConflictResolutionController {
  constructor(private readonly conflictResolutionService: ConflictResolutionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new land dispute' })
  async create(@Body() createDisputeDto: CreateDisputeDto) {
    return this.conflictResolutionService.create({
      ...createDisputeDto,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all land disputes' })
  findAll() {
    return this.conflictResolutionService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active disputes' })
  getActiveDisputes() {
    return this.conflictResolutionService.findByStatus(DisputeStatus.PENDING);
  }

  @Get('resolved')
  @ApiOperation({ summary: 'Get resolved disputes' })
  getResolvedDisputes() {
    return this.conflictResolutionService.findByStatus(DisputeStatus.RESOLVED);
  }

  @Get('participant')
  @ApiOperation({ summary: 'Get disputes by participant' })
  findByParticipant(@Request() req) {
    return this.conflictResolutionService.findByParticipant(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a land dispute by ID' })
  findOne(@Param('id') id: string) {
    return this.conflictResolutionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a land dispute' })
  update(@Param('id') id: string, @Body() updateDisputeDto: UpdateDisputeDto) {
    return this.conflictResolutionService.update(id, updateDisputeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a land dispute' })
  remove(@Param('id') id: string) {
    return this.conflictResolutionService.remove(id);
  }

  @Post(':id/resolve')
  @ApiOperation({ summary: 'Resolve a land dispute' })
  resolve(@Param('id') id: string, @Body('resolution') resolution: string) {
    return this.conflictResolutionService.resolve(id, resolution);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Add a comment to a dispute' })
  addComment(
    @Param('id') id: string,
    @Body('comment') comment: string,
  ) {
    return this.conflictResolutionService.addComment(id, comment);
  }

  @Post(':id/field-visit')
  @ApiOperation({ summary: 'Record field visit report' })
  recordFieldVisit(
    @Param('id') id: string,
    @Body('report') report: string,
  ) {
    return this.conflictResolutionService.recordFieldVisit(id, report);
  }
} 