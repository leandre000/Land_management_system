import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LandTaxesService } from './land-taxes.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { TaxAssessment } from './entities/tax-assessment.entity';

@ApiTags('land-taxes')
@Controller('land-taxes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class LandTaxesController {
  constructor(private readonly landTaxesService: LandTaxesService) {}

  @Post('assessments')
  @Roles(UserRole.TAX_OFFICER)
  @ApiOperation({ summary: 'Create a new tax assessment' })
  @ApiResponse({ status: 201, description: 'Assessment created successfully', type: TaxAssessment })
  createAssessment(@Body() createAssessmentDto: CreateAssessmentDto, @Request() req) {
    return this.landTaxesService.create(createAssessmentDto, req.user);
  }

  @Get('assessments')
  @Roles(UserRole.ADMIN, UserRole.TAX_OFFICER)
  @ApiOperation({ summary: 'Get all tax assessments' })
  @ApiResponse({ status: 200, description: 'Return all tax assessments', type: [TaxAssessment] })
  findAll() {
    return this.landTaxesService.findAll();
  }

  @Get('assessments/overdue')
  @Roles(UserRole.ADMIN, UserRole.TAX_OFFICER)
  @ApiOperation({ summary: 'Get all overdue tax assessments' })
  @ApiResponse({ status: 200, description: 'Return all overdue tax assessments', type: [TaxAssessment] })
  getOverdueTaxes() {
    return this.landTaxesService.getOverdueTaxes();
  }

  @Get('assessments/my-taxes')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Get user\'s tax assessments' })
  @ApiResponse({ status: 200, description: 'Return user\'s tax assessments', type: [TaxAssessment] })
  findMyTaxes(@Request() req) {
    return this.landTaxesService.findByOwner(req.user.id);
  }

  @Get('assessments/:id')
  @ApiOperation({ summary: 'Get tax assessment by id' })
  @ApiResponse({ status: 200, description: 'Return the tax assessment', type: TaxAssessment })
  findOne(@Param('id') id: string) {
    return this.landTaxesService.findOne(id);
  }

  @Get('assessments/land/:landId')
  @ApiOperation({ summary: 'Get tax assessments by land id' })
  @ApiResponse({ status: 200, description: 'Return tax assessments for the land', type: [TaxAssessment] })
  findByLand(@Param('landId') landId: string) {
    return this.landTaxesService.findByLand(landId);
  }

  @Post('assessments/:id/payments')
  @Roles(UserRole.CITIZEN)
  @ApiOperation({ summary: 'Record a tax payment' })
  @ApiResponse({ status: 200, description: 'Payment recorded successfully', type: TaxAssessment })
  recordPayment(
    @Param('id') id: string,
    @Body() recordPaymentDto: RecordPaymentDto,
  ) {
    return this.landTaxesService.recordPayment(id, recordPaymentDto);
  }
} 