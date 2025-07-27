import { Module } from '@nestjs/common';
import { DocumentGenerationService } from './document-generation.service';
 
@Module({
  providers: [DocumentGenerationService],
  exports: [DocumentGenerationService],
})
export class DocumentGenerationModule {} 