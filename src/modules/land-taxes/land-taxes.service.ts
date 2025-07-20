import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { TaxAssessment, TaxStatus } from './entities/tax-assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class LandTaxesService {
  constructor(
    @InjectRepository(TaxAssessment)
    private readonly taxAssessmentRepository: Repository<TaxAssessment>,
    private readonly landService: LandRegistrationService,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto, assessor: User): Promise<TaxAssessment> {
    const land = await this.landService.findOne(createAssessmentDto.landId);

    // Check for existing pending or overdue assessments
    const existingAssessment = await this.taxAssessmentRepository.findOne({
      where: {
        land: { id: land.id },
        status: TaxStatus.PENDING,
      },
    });

    if (existingAssessment) {
      throw new ConflictException('There is already a pending assessment for this land');
    }

    const taxAmount = (createAssessmentDto.assessedValue * createAssessmentDto.taxRate) / 100;

    const assessment = this.taxAssessmentRepository.create({
      land,
      assessedValue: createAssessmentDto.assessedValue,
      taxRate: createAssessmentDto.taxRate,
      taxAmount,
      assessmentDate: new Date(),
      dueDate: createAssessmentDto.dueDate,
      notes: createAssessmentDto.notes,
      assessedBy: assessor,
    });

    return this.taxAssessmentRepository.save(assessment);
  }

  async findAll(): Promise<TaxAssessment[]> {
    return this.taxAssessmentRepository.find();
  }

  async findOne(id: string): Promise<TaxAssessment> {
    const assessment = await this.taxAssessmentRepository.findOne({ where: { id } });
    if (!assessment) {
      throw new NotFoundException(`Tax assessment with ID "${id}" not found`);
    }
    return assessment;
  }

  async findByLand(landId: string): Promise<TaxAssessment[]> {
    return this.taxAssessmentRepository.find({
      where: { land: { id: landId } },
      order: { assessmentDate: 'DESC' },
    });
  }

  async findByOwner(ownerId: string): Promise<TaxAssessment[]> {
    return this.taxAssessmentRepository.find({
      where: { land: { owner: { id: ownerId } } },
      order: { assessmentDate: 'DESC' },
    });
  }

  async recordPayment(id: string, recordPaymentDto: RecordPaymentDto): Promise<TaxAssessment> {
    const assessment = await this.findOne(id);

    if (assessment.status === TaxStatus.PAID) {
      throw new ConflictException('Tax has already been paid');
    }

    const totalDue = assessment.taxAmount + assessment.penaltyAmount;
    const totalPaid = assessment.paidAmount + recordPaymentDto.amount;

    if (totalPaid > totalDue) {
      throw new ConflictException('Payment amount exceeds the total due amount');
    }

    assessment.paidAmount = totalPaid;
    assessment.paymentDate = new Date();
    assessment.paymentDetails = recordPaymentDto.paymentDetails;
    assessment.notes = recordPaymentDto.notes || assessment.notes;
    assessment.status = totalPaid >= totalDue ? TaxStatus.PAID : TaxStatus.PENDING;

    return this.taxAssessmentRepository.save(assessment);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkOverdueTaxes() {
    const overdueAssessments = await this.taxAssessmentRepository.find({
      where: {
        status: TaxStatus.PENDING,
        dueDate: LessThan(new Date()),
      },
    });

    for (const assessment of overdueAssessments) {
      const daysOverdue = Math.floor(
        (Date.now() - assessment.dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Apply penalty (1% per day overdue, up to 20%)
      const penaltyRate = Math.min(daysOverdue * 0.01, 0.2);
      assessment.penaltyAmount = assessment.taxAmount * penaltyRate;
      assessment.status = TaxStatus.OVERDUE;

      await this.taxAssessmentRepository.save(assessment);
    }
  }

  async getOverdueTaxes(): Promise<TaxAssessment[]> {
    return this.taxAssessmentRepository.find({
      where: { status: TaxStatus.OVERDUE },
      order: { dueDate: 'ASC' },
    });
  }
} 