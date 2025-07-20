import { Controller, Get, Post, Param, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationsService, NotificationType } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications for the current user' })
  @ApiResponse({ status: 200, description: 'Returns all notifications' })
  async getUserNotifications(@Request() req) {
    return this.notificationsService.getUserNotifications(req.user.id);
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get unread notifications for the current user' })
  @ApiResponse({ status: 200, description: 'Returns unread notifications' })
  async getUnreadNotifications(@Request() req) {
    return this.notificationsService.getUnreadNotifications(req.user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(@Request() req, @Param('id') notificationId: string) {
    await this.notificationsService.markAsRead(req.user.id, notificationId);
    return { message: 'Notification marked as read' };
  }

  @Post('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@Request() req) {
    await this.notificationsService.markAllAsRead(req.user.id);
    return { message: 'All notifications marked as read' };
  }

  @Get('status/:entityType/:entityId')
  @ApiOperation({ summary: 'Get status updates for an entity' })
  @ApiResponse({ status: 200, description: 'Returns entity status' })
  async getStatus(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.notificationsService.getStatus(entityType, entityId);
  }

  @Post('subscribe/:entityType/:entityId')
  @ApiOperation({ summary: 'Subscribe to entity updates' })
  @ApiResponse({ status: 200, description: 'Subscribed to entity updates' })
  async subscribeToEntity(
    @Request() req,
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    await this.notificationsService.subscribeToEntity(req.user.id, entityType, entityId);
    return { message: 'Subscribed to entity updates' };
  }

  @Post('unsubscribe/:entityType/:entityId')
  @ApiOperation({ summary: 'Unsubscribe from entity updates' })
  @ApiResponse({ status: 200, description: 'Unsubscribed from entity updates' })
  async unsubscribeFromEntity(
    @Request() req,
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    await this.notificationsService.unsubscribeFromEntity(req.user.id, entityType, entityId);
    return { message: 'Unsubscribed from entity updates' };
  }
} 