import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req, Query, Res, HttpStatus } from '@nestjs/common';
import { LandRegistrationService } from './land-registration.service';
import { CreateLandDto } from './dto/create-land.dto';
import { CreateLandGeoJsonDto } from './dto/create-land-geojson.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Response } from 'express';

@ApiTags('land-registration')
@Controller('land-registration')
@UseGuards(JwtAuthGuard,RolesGuard)
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

  @Post('geojson')
  @ApiOperation({ summary: 'Register a new land using GeoJSON polygon' })
  @ApiResponse({ status: 201, description: 'The land has been successfully registered from GeoJSON.' })
  createWithGeoJson(@Body() createLandDto: CreateLandGeoJsonDto, @Req() req: any) {

    const landData = {
      ...createLandDto,
      ownerId: req.user.id,
    };
    return this.landRegistrationService.createWithGeoJson(landData, req.user.id);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all registered lands' })
  @ApiResponse({ status: 200, description: 'Return all registered lands.' })
  findAll() {
    return this.landRegistrationService.findAll();
  }

  @Get('nearby')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get nearby lands' })
  @ApiResponse({ status: 200, description: 'Return nearby lands using postGIS spartial coordinates' })
  findNearby(@Query('lat') lat: number, @Query('lng') lng: number, @Query('radius') radius: number) {
    return this.landRegistrationService.findNearby(+lat, +lng, +radius || 1000);
  }


  @Get('my-lands')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get all lands owned by the current user' })
  @ApiResponse({ status: 200, description: 'Return all lands owned by the current user.' })
  findMyLands(@Req() req: any) {
    return this.landRegistrationService.findByOwner(req.user.id);
  }


  @Get(':id')
  @Roles(UserRole.CITIZEN,UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a specific land' })
  @ApiResponse({ status: 200, description: 'Return the land.' })
  findOne(@Param('id') id: string) {
    return this.landRegistrationService.findOne(id);
  }

  @Put(':id')
    @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Update a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateLandDto: UpdateLandDto) {
    return this.landRegistrationService.update(id, updateLandDto);
  }

  @Delete(':id')
    @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Delete a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.landRegistrationService.remove(id);
  }

  @Post(':id/verify')
    @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Verify a land' })
  @ApiResponse({ status: 200, description: 'The land has been successfully verified.' })
  verify(@Param('id') id: string, @Req() req: any) {
    return this.landRegistrationService.verify(id, req.user.id);
  }

  @Get(':id/certificate')
  @Roles(UserRole.CITIZEN, UserRole.LAND_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Generate and download land certificate PDF' })
  @ApiResponse({ status: 200, description: 'Land certificate PDF generated successfully.' })
  async generateCertificate(@Param('id') id: string, @Req() req: any, @Res() res: Response) {
    try {
      const pdfBuffer = await this.landRegistrationService.generateLandCertificate(id, req.user.id);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="land-certificate-${id}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });
      
      res.status(HttpStatus.OK).send(pdfBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate certificate',
        error: error.message,
      });
    }
  }

  @Get(':id/certificate-html')
  @Roles(UserRole.CITIZEN, UserRole.LAND_OFFICER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Generate land certificate as HTML (for debugging)' })
  @ApiResponse({ status: 200, description: 'Land certificate HTML generated successfully.' })
  async generateCertificateHtml(@Param('id') id: string, @Req() req: any, @Res() res: Response) {
    try {
      const html = await this.landRegistrationService.generateLandCertificateHtml(id, req.user.id);
      
      res.set({
        'Content-Type': 'text/html',
      });
      
      res.status(HttpStatus.OK).send(html);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to generate HTML certificate',
        error: error.message,
      });
    }
  }
} 