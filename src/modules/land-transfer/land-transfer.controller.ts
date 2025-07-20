import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { LandTransferService } from './land-transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('land-transfer')
@Controller('land-transfer')
@UseGuards(JwtAuthGuard)
export class LandTransferController {
  constructor(private readonly landTransferService: LandTransferService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new land transfer request' })
  @ApiResponse({ status: 201, description: 'The land transfer has been successfully created.' })
  create(@Body() createTransferDto: CreateTransferDto) {
    return this.landTransferService.create(createTransferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all land transfers' })
  @ApiResponse({ status: 200, description: 'Return all land transfers.' })
  findAll() {
    return this.landTransferService.findAll();
  }

  @Get('my-transfers')
  @ApiOperation({ summary: 'Get all transfers related to the current user' })
  @ApiResponse({ status: 200, description: 'Return all transfers where the user is either the sender or receiver.' })
  findMyTransfers(@Req() req: any) {
    return this.landTransferService.findByOwner(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific land transfer' })
  @ApiResponse({ status: 200, description: 'Return the land transfer.' })
  findOne(@Param('id') id: string) {
    return this.landTransferService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a land transfer' })
  @ApiResponse({ status: 200, description: 'The land transfer has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateTransferDto: UpdateTransferDto) {
    return this.landTransferService.update(id, updateTransferDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a land transfer' })
  @ApiResponse({ status: 200, description: 'The land transfer has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.landTransferService.remove(id);
  }

  @Post(':id/approve')
  @ApiOperation({ summary: 'Approve a land transfer' })
  @ApiResponse({ status: 200, description: 'The land transfer has been successfully approved.' })
  approve(@Param('id') id: string) {
    return this.landTransferService.approve(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject a land transfer' })
  @ApiResponse({ status: 200, description: 'The land transfer has been successfully rejected.' })
  reject(@Param('id') id: string, @Body('reason') reason: string) {
    return this.landTransferService.reject(id, reason);
  }
} 