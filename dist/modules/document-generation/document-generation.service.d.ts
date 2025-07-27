import { Land } from '../land-registration/entities/land.entity';
import { User } from '../users/entities/user.entity';
import { TaxAssessment } from '../land-taxes/entities/tax-assessment.entity';
export interface LandDocumentData {
    land: Land;
    owner: User;
    taxAssessment?: TaxAssessment;
    mapImage?: string;
    generatedAt: Date;
    documentType: 'OWNERSHIP_CERTIFICATE' | 'TAX_ASSESSMENT' | 'LAND_SURVEY';
}
export declare class DocumentGenerationService {
    private landCertificateTemplate;
    constructor();
    generateLandCertificate(data: LandDocumentData): Promise<Buffer>;
    generateLandCertificateHtml(data: LandDocumentData): Promise<string>;
    generateMapPreview(geoJson: object): Promise<string>;
    calculateLandArea(geoJson: object): number;
}
