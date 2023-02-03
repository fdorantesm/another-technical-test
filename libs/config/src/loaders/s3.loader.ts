import { registerAs } from '@nestjs/config';
import { S3ConfigType } from '../types/s3.type';
import { ConfigLoader } from './config.loader';

export const S3ConfigLoader = registerAs(
  's3',
  (): S3ConfigType => ConfigLoader().s3,
);
