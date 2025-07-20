import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LandRegistrationService } from './land-registration.service';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { VerifyLandDto } from './dto/verify-land.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { Land } from './entities/land.entity';

@ApiTags('land-registration')
@Controller('land-registration')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class LandRegistrationController {
  constructor(private readonly landRegistrationService: LandRegistrationService) {}

  @Post()
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Register new land' })
  @ApiResponse({ status: 201, description: 'Land registered successfully', type: Land })
  create(@Body() createLandDto: CreateLandDto, @Request() req) {
    return this.landRegistrationService.create(createLandDto, req.user);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get all lands' })
  @ApiResponse({ status: 200, description: 'Return all lands', type: [Land] })
  findAll() {
    return this.landRegistrationService.findAll();
  }

  @Get('my-lands')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get user\'s lands' })
  @ApiResponse({ status: 200, description: 'Return user\'s lands', type: [Land] })
  findMyLands(@Request() req) {
    return this.landRegistrationService.findByOwner(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get land by id' })
  @ApiResponse({ status: 200, description: 'Return the land', type: Land })
  findOne(@Param('id') id: string) {
    return this.landRegistrationService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Update land' })
  @ApiResponse({ status: 200, description: 'Land updated successfully', type: Land })
  update(
    @Param('id') id: string,
    @Body() updateLandDto: UpdateLandDto,
    @Request() req,
  ) {
    return this.landRegistrationService.update(id, updateLandDto, req.user);
  }

  @Patch(':id/verify')
  @Roles(UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Verify land' })
  @ApiResponse({ status: 200, description: 'Land verified successfully', type: Land })
  verify(
    @Param('id') id: string,
    @Body() verifyLandDto: VerifyLandDto,
    @Request() req,
  ) {
    return this.landRegistrationService.verify(id, verifyLandDto, req.user);
  }

  @Delete(':id')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Delete land' })
  @ApiResponse({ status: 200, description: 'Land deleted successfully' })
  remove(@Param('id') id: string, @Request() req) {
    return this.landRegistrationService.remove(id, req.user);
  }
} 