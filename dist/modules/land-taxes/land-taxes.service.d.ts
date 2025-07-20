import { Repository } from 'typeorm';
import { TaxAssessment } from './entities/tax-assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { User } from '../users/entities/user.entity';
import { LandRegistrationService } from '../land-registration/land-registration.service';
export declare class LandTaxesService {
    private readonly taxAssessmentRepository;
    private readonly landService;
    constructor(taxAssessmentRepository: Repository<TaxAssessment>, landService: LandRegistrationService);
    create(createAssessmentDto: CreateAssessmentDto, assessor: User): Promise<TaxAssessment>;
    findAll(): Promise<TaxAssessment[]>;
    findOne(id: string): Promise<TaxAssessment>;
    findByLand(landId: string): Promise<TaxAssessment[]>;
    findByOwner(ownerId: string): Promise<TaxAssessment[]>;
    recordPayment(id: string, recordPaymentDto: RecordPaymentDto): Promise<TaxAssessment>;
    checkOverdueTaxes(): Promise<void>;
    getOverdueTaxes(): Promise<TaxAssessment[]>;
}
