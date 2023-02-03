import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import { S3_SERVICE } from '../../application/constants/injection-tokens';
import { IS3Service } from '../../domain/contracts/s3.service';
import { options } from '@app/config/options/config.options';

describe('S3Service', () => {
  let service: IS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(options)],
      providers: [
        {
          provide: S3_SERVICE,
          useClass: S3Service,
        },
      ],
    }).compile();

    service = module.get<IS3Service>(S3_SERVICE);
  });

  it('should be defined"', () => {
    expect(service).toBeDefined();
  });

  it('should returns object url with signature"', async () => {
    const signedUrl = await service.getSignedUrl(
      'images/profile.jpg',
      'default',
    );
    expect(signedUrl.includes('X-AMZ-Signature'));
    expect(signedUrl.includes('X-AMZ-Credential'));
  });
});
