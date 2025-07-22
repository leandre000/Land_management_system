import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query } from '@nestjs/common';
import { LandRegistrationService } from './land-registration.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('land-registration')
@Controller('land-registration')
@UseGuards(JwtAuthGuard)
export class LandRegistrationController {
  constructor(private readonly landRegistrationService: LandRegistrationService) { }

  @Post()
  @ApiOperation({ summary: 'Register a new land' })
  @ApiResponse({ status: 201, description: 'The land has been successfully registered.' })
  create(@Body() createLandDto: CreateLandDto, @Req() req: any) {
    return this.landRegistrationService.create({
      ...createLandDto,
      ownerId: req.user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all registered lands' })
  @ApiResponse({ status: 200, description: 'Return all registered lands.' })
  findAll() {
    return this.landRegistrationService.findAll();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Get nearby lands' })
  @ApiResponse({ status: 200, description: 'Return nearby lands using postGIS spartial coordinates' })
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius') radius: number) {
    return this.landRegistrationService.findNearby(+lat, +lng, +radius || 1000);
  }


  @Get('my-lands')
  @ApiOperation({ summary: 'Get all lands owned by the current user' })
  @ApiResponse({ status: 200, description: 'Return all lands owned by the current user.' })
  findMyLands(@Req() req: any) {
    return this.landRegistrationService.findByOwner(req.user.id);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a specific land' })
  @ApiResponse({ status: 200, description: 'Return the land.' })
  findOne(@Param('id') id: string) {
    return this.landRegistrationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto) {
    return this.landRegistrationService.update(id, updateLandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.landRegistrationService.remove(id);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Verify a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully verified.' })
  verify(@Param('id') id: string, @Req() req: any) {
    return this.landRegistrationService.verify(id, req.user.id);
  }
} 