import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuditLogsService } from './audit-logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { AuditAction } from './entities/audit-log.entity';

@ApiTags('audit-logs')
@Controller('audit-logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all audit logs (admin only)' })
  @ApiResponse({ status: 200, description: 'Return all audit logs with pagination.' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  findAll(
    @Query('limit') limit: string = '100',
    @Query('offset') offset: string = '0',
  ) {
    return this.auditLogsService.findAll(parseInt(limit), parseInt(offset));
  }

  @Get('recent')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get recent audit logs' })
  @ApiResponse({ status: 200, description: 'Return recent audit logs.' })
  @ApiQuery({ name: 'hours', required: false, type: Number })
  findRecent(@Query('hours') hours: string = '24') {
    return this.auditLogsService.findRecent(parseInt(hours));
  }

  @Get('entity/:entityType/:entityId')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get audit logs for a specific entity' })
  @ApiResponse({ status: 200, description: 'Return audit logs for the entity.' })
  findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditLogsService.findByEntity(entityType, entityId);
  }

  @Get('user/:userId')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get audit logs for a specific user' })
  @ApiResponse({ status: 200, description: 'Return audit logs for the user.' })
  findByUser(@Param('userId') userId: string) {
    return this.auditLogsService.findByUser(userId);
  }

  @Get('action/:action')
  @Roles(UserRole.ADMIN, UserRole.LAND_OFFICER)
  @ApiOperation({ summary: 'Get audit logs for a specific action' })
  @ApiResponse({ status: 200, description: 'Return audit logs for the action.' })
  findByAction(@Param('action') action: AuditAction) {
    return this.auditLogsService.findByAction(action);
  }
} 