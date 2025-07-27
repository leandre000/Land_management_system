"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentGenerationService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const turf = require("@turf/turf");
let DocumentGenerationService = class DocumentGenerationService {
    landCertificateTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Land Ownership Certificate</title>
        <style>
            body { 
                font-family: 'Times New Roman', serif; 
                margin: 0; 
                padding: 40px;
                background: white;
            }
            .header { 
                text-align: center; 
                margin-bottom: 40px;
                border-bottom: 3px solid #2c5530;
                padding-bottom: 20px;
            }
            .logo { 
                width: 100px; 
                height: 100px; 
                margin: 0 auto 20px;
                background: #2c5530;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
            }
            .title { 
                font-size: 24px; 
                font-weight: bold; 
                color: #2c5530;
                margin: 10px 0;
            }
            .subtitle { 
                font-size: 16px; 
                color: #666;
            }
            .content { 
                margin: 40px 0;
                line-height: 1.8;
            }
            .section { 
                margin: 30px 0;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
            }
            .section-title { 
                font-size: 18px; 
                font-weight: bold; 
                color: #2c5530;
                margin-bottom: 15px;
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
            }
            .field { 
                margin: 12px 0;
                display: flex;
            }
            .field-label { 
                font-weight: bold; 
                min-width: 150px;
                color: #333;
            }
            .field-value { 
                color: #555;
                flex: 1;
            }
            .map-container { 
                text-align: center; 
                margin: 30px 0;
                padding: 20px;
                background: #f9f9f9;
                border-radius: 8px;
            }
            .map-image { 
                max-width: 100%; 
                max-height: 400px;
                border: 2px solid #ddd;
                border-radius: 4px;
            }
            .footer { 
                margin-top: 50px; 
                text-align: center;
                border-top: 2px solid #2c5530;
                padding-top: 20px;
                font-size: 12px;
                color: #666;
            }
            .signature-section {
                margin-top: 60px;
                display: flex;
                justify-content: space-between;
            }
            .signature-box {
                text-align: center;
                width: 200px;
            }
            .signature-line {
                border-top: 1px solid #333;
                margin-top: 50px;
                padding-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="logo">RLM</div>
            <div class="title">REPUBLIC OF RWANDA</div>
            <div class="title">LAND OWNERSHIP CERTIFICATE</div>
            <div class="subtitle">Rwanda Land Management Authority</div>
        </div>

        <div class="content">
            <div class="section">
                <div class="section-title">LAND INFORMATION</div>
                <div class="field">
                    <div class="field-label">Plot Number:</div>
                    <div class="field-value">{{land.plotNumber}}</div>
                </div>
                <div class="field">
                    <div class="field-label">Title:</div>
                    <div class="field-value">{{land.title}}</div>
                </div>
                <div class="field">
                    <div class="field-label">Area:</div>
                    <div class="field-value">{{land.area}} square meters</div>
                </div>
                <div class="field">
                    <div class="field-label">Address:</div>
                    <div class="field-value">{{land.address}}</div>
                </div>
                <div class="field">
                    <div class="field-label">Status:</div>
                    <div class="field-value">{{land.status}}</div>
                </div>
                {{#if land.description}}
                <div class="field">
                    <div class="field-label">Description:</div>
                    <div class="field-value">{{land.description}}</div>
                </div>
                {{/if}}
            </div>

            <div class="section">
                <div class="section-title">OWNER INFORMATION</div>
                <div class="field">
                    <div class="field-label">Full Name:</div>
                    <div class="field-value">{{owner.firstName}} {{owner.lastName}}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value">{{owner.email}}</div>
                </div>
                {{#if owner.nationalId}}
                <div class="field">
                    <div class="field-label">National ID:</div>
                    <div class="field-value">{{owner.nationalId}}</div>
                </div>
                {{/if}}
                {{#if owner.phoneNumber}}
                <div class="field">
                    <div class="field-label">Phone:</div>
                    <div class="field-value">{{owner.phoneNumber}}</div>
                </div>
                {{/if}}
                {{#if owner.address}}
                <div class="field">
                    <div class="field-label">Address:</div>
                    <div class="field-value">{{owner.address}}</div>
                </div>
                {{/if}}
            </div>

            {{#if taxAssessment}}
            <div class="section">
                <div class="section-title">TAX INFORMATION</div>
                <div class="field">
                    <div class="field-label">Assessed Value:</div>
                    <div class="field-value">{{taxAssessment.assessedValue}} RWF</div>
                </div>
                <div class="field">
                    <div class="field-label">Tax Rate:</div>
                    <div class="field-value">{{taxAssessment.taxRate}}%</div>
                </div>
                <div class="field">
                    <div class="field-label">Annual Tax:</div>
                    <div class="field-value">{{taxAssessment.taxAmount}} RWF</div>
                </div>
                <div class="field">
                    <div class="field-label">Tax Status:</div>
                    <div class="field-value">{{taxAssessment.status}}</div>
                </div>
            </div>
            {{/if}}

            {{#if mapImage}}
            <div class="map-container">
                <div class="section-title">LAND LOCATION MAP</div>
                <img src="{{mapImage}}" alt="Land Location Map" class="map-image" />
            </div>
            {{/if}}

            <div class="section">
                <div class="section-title">CERTIFICATION</div>
                <p>This certificate confirms that the above-mentioned person is the legal owner of the described land parcel as recorded in the Rwanda Land Management System.</p>
                <div class="field">
                    <div class="field-label">Registration Date:</div>
                    <div class="field-value">{{formatDate land.createdAt}}</div>
                </div>
                {{#if land.verificationDate}}
                <div class="field">
                    <div class="field-label">Verification Date:</div>
                    <div class="field-value">{{formatDate land.verificationDate}}</div>
                </div>
                {{/if}}
                <div class="field">
                    <div class="field-label">Document Generated:</div>
                    <div class="field-value">{{formatDate generatedAt}}</div>
                </div>
            </div>
        </div>

        <div class="signature-section">
            <div class="signature-box">
                <div class="signature-line">Land Officer</div>
            </div>
            <div class="signature-box">
                <div class="signature-line">Director General</div>
            </div>
        </div>

        <div class="footer">
            <p>This document is electronically generated and is valid without a signature.</p>
            <p>Rwanda Land Management Authority | Kigali, Rwanda</p>
            <p>Generated on {{formatDateTime generatedAt}}</p>
        </div>
    </body>
    </html>
  `;
    constructor() {
        handlebars.registerHelper('formatDate', (date) => {
            return new Date(date).toLocaleDateString('en-GB');
        });
        handlebars.registerHelper('formatDateTime', (date) => {
            return new Date(date).toLocaleString('en-GB');
        });
    }
    async generateLandCertificate(data) {
        try {
            const template = handlebars.compile(this.landCertificateTemplate);
            const html = template(data);
            const browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ],
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });
            const pdf = await page.pdf({
                format: 'A4',
                margin: {
                    top: '20mm',
                    right: '20mm',
                    bottom: '20mm',
                    left: '20mm',
                },
                printBackground: true,
            });
            await browser.close();
            return Buffer.from(pdf);
        }
        catch (error) {
            console.error('Puppeteer PDF generation failed:', error);
            const template = handlebars.compile(this.landCertificateTemplate);
            const html = template(data);
            throw new Error(`PDF generation failed. HTML content generated successfully. Error: ${error.message}`);
        }
    }
    async generateLandCertificateHtml(data) {
        try {
            const template = handlebars.compile(this.landCertificateTemplate);
            const html = template(data);
            return html;
        }
        catch (error) {
            throw new Error(`Failed to generate HTML: ${error.message}`);
        }
    }
    async generateMapPreview(geoJson) {
        try {
            const feature = geoJson;
            const coordinates = feature.geometry.coordinates[0];
            const bbox = turf.bbox(feature);
            const [minX, minY, maxX, maxY] = bbox;
            const width = 400;
            const height = 300;
            const padding = 20;
            const scaleX = (width - 2 * padding) / (maxX - minX);
            const scaleY = (height - 2 * padding) / (maxY - minY);
            const scale = Math.min(scaleX, scaleY);
            const svgPoints = coordinates
                .map(([x, y]) => {
                const svgX = padding + (x - minX) * scale;
                const svgY = height - padding - (y - minY) * scale;
                return `${svgX},${svgY}`;
            })
                .join(' ');
            const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e0e0e0" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <polygon points="${svgPoints}" fill="rgba(44, 85, 48, 0.3)" stroke="#2c5530" stroke-width="2" />
          <text x="10" y="20" font-family="Arial" font-size="12" fill="#666">Land Parcel Boundary</text>
        </svg>
      `;
            return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        }
        catch (error) {
            console.error('Failed to generate map preview:', error);
            return '';
        }
    }
    calculateLandArea(geoJson) {
        try {
            const area = turf.area(geoJson);
            return Math.round(area * 100) / 100;
        }
        catch (error) {
            console.error('Failed to calculate area:', error);
            return 0;
        }
    }
};
exports.DocumentGenerationService = DocumentGenerationService;
exports.DocumentGenerationService = DocumentGenerationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DocumentGenerationService);
//# sourceMappingURL=document-generation.service.js.map