import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { SystemSetting, SettingType } from './entities/system-setting.entity';

@ApiTags('settings')
@Controller('settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new system setting' })
  @ApiResponse({ status: 201, description: 'Setting created successfully', type: SystemSetting })
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all system settings' })
  @ApiResponse({ status: 200, description: 'Return all settings', type: [SystemSetting] })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get('active')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all active settings' })
  @ApiResponse({ status: 200, description: 'Return all active settings', type: [SystemSetting] })
  getActiveSettings() {
    return this.settingsService.getActiveSettings();
  }

  @Get('type/:type')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get settings by type' })
  @ApiResponse({ status: 200, description: 'Return settings of specified type', type: [SystemSetting] })
  findByType(@Param('type') type: SettingType) {
    return this.settingsService.findByType(type);
  }

  @Get('key/:key')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get setting by key' })
  @ApiResponse({ status: 200, description: 'Return setting with specified key', type: SystemSetting })
  findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get setting by id' })
  @ApiResponse({ status: 200, description: 'Return the setting', type: SystemSetting })
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update setting' })
  @ApiResponse({ status: 200, description: 'Setting updated successfully', type: SystemSetting })
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Post('bulk-update')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Bulk update settings' })
  @ApiResponse({ status: 200, description: 'Settings updated successfully', type: [SystemSetting] })
  bulkUpdate(@Body() settings: UpdateSettingDto[]) {
    return this.settingsService.bulkUpdate(settings);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete setting' })
  @ApiResponse({ status: 200, description: 'Setting deleted successfully' })
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }

  @Get('value/:type/:key')
  @ApiOperation({ summary: 'Get setting value' })
  @ApiResponse({ status: 200, description: 'Return the setting value' })
  getSettingValue(@Param('type') type: SettingType, @Param('key') key: string) {
    return this.settingsService.getSettingValue(type, key);
  }
} 