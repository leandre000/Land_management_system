import { LandTaxesService } from './land-taxes.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { TaxAssessment } from './entities/tax-assessment.entity';
export declare class LandTaxesController {
    private readonly landTaxesService;
    constructor(landTaxesService: LandTaxesService);
    createAssessment(createAssessmentDto: CreateAssessmentDto, req: any): Promise<TaxAssessment>;
    findAll(): Promise<TaxAssessment[]>;
    getOverdueTaxes(): Promise<TaxAssessment[]>;
    findMyTaxes(req: any): Promise<TaxAssessment[]>;
    findOne(id: string): Promise<TaxAssessment>;
    findByLand(landId: string): Promise<TaxAssessment[]>;
    recordPayment(id: string, recordPaymentDto: RecordPaymentDto): Promise<TaxAssessment>;
}
