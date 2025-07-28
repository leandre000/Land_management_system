import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class MinioService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: 'http://localhost:9000',
      accessKeyId: 'minio',
      secretAccessKey: 'minio123',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  async uploadFile(bucket: string, key: string, body: Buffer, contentType: string) {
    await this.ensureBucket(bucket);
    return this.s3.upload({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }).promise();
  }

  async ensureBucket(bucket: string) {
    const exists = await this.s3
      .headBucket({ Bucket: bucket })
      .promise()
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      await this.s3.createBucket({ Bucket: bucket }).promise();
    }
  }

  async getFileUrl(bucket: string, key: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: key,
      Expires: 60 * 60, // 1 hour
    });
  }
}
