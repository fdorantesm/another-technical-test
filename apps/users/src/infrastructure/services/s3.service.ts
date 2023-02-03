import { Injectable } from '@nestjs/common';
import { IS3Service } from '../../domain/contracts/s3.service';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { S3ConfigType } from '@app/config/types/s3.type';

@Injectable()
export class S3Service implements IS3Service {
  private params: S3ConfigType;
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.params = this.configService.get<S3ConfigType>('s3');
    this.s3 = new S3({
      region: this.params.region,
      signatureVersion: 'v4',
      s3ForcePathStyle: true,
      endpoint: this.params.endpoint,
      credentials: {
        accessKeyId: this.params.accessKey,
        secretAccessKey: this.params.secretKey,
      },
    });
  }

  public async getSignedUrl(key: string, bucket: string): Promise<string> {
    const signedUrl = await this.s3.getSignedUrl('getObject', {
      Key: key,
      Bucket: bucket,
      Expires: 3600,
    });

    return signedUrl;
  }
}
