import { Controller, Get, Post, Param, Query, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { ReportType } from './entities/report.entity';

@ApiTags('reports')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all generated reports (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return all reports.' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getReports(@Query('limit') limit: string = '20') {
    return this.reportsService.getReports(parseInt(limit));
  }

  @Post('generate/weekly')
  @ApiOperation({ summary: 'Generate weekly report manually' })
  @ApiResponse({ status: 201, description: 'Weekly report generated successfully.' })
  @ApiQuery({ name: 'startDate', required: false, type: String, description: 'YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', required: false, type: String, description: 'YYYY-MM-DD format' })
  async generateWeeklyReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const report = await this.reportsService.generateManualReport(
      ReportType.WEEKLY_SUMMARY,
      start,
      end
    );
    
    return {
      message: 'Weekly report generated successfully',
      reportId: report.id,
      downloadUrl: `/reports/${report.id}/download`
    };
  }

  @Post('generate/analytics')
  @ApiOperation({ summary: 'Generate geo-analytics report' })
  @ApiResponse({ status: 201, description: 'Analytics report generated successfully.' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async generateAnalyticsReport(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate ? new Date(startDate) : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const report = await this.reportsService.generateManualReport(
      ReportType.GEO_ANALYTICS,
      start,
      end
    );
    
    return {
      message: 'Analytics report generated successfully',
      reportId: report.id,
      downloadUrl: `/reports/${report.id}/download`
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific report details' })
  @ApiResponse({ status: 200, description: 'Return report details.' })
  getReport(@Param('id') id: string) {
    return this.reportsService.getReport(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download report as PDF/HTML' })
  @ApiResponse({ status: 200, description: 'Download report file.' })
  async downloadReport(@Param('id') id: string, @Res() res: Response) {
    try {
      const reportBuffer = await this.reportsService.downloadReport(id);
      const report = await this.reportsService.getReport(id);
      
      res.set({
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="${report.title.replace(/\s+/g, '_')}.html"`,
        'Content-Length': reportBuffer.length,
      });
      
      res.status(HttpStatus.OK).send(reportBuffer);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to download report',
        error: error.message,
      });
    }
  }

  @Get('quick/dashboard')
  @ApiOperation({ summary: 'Get quick dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Return dashboard stats.' })
  async getDashboardStats() {
    // Generate quick stats for dashboard
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    const report = await this.reportsService.generateManualReport(
      ReportType.WEEKLY_SUMMARY,
      startDate,
      endDate
    );
    
    return {
      message: 'Dashboard statistics',
      data: report.data,
      generatedAt: new Date(),
    };
  }
} 