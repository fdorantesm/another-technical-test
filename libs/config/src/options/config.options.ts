import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { configSchema } from '@app/config/schemas/config.schema';
import { ServerConfigLoader } from '@app/config/loaders';
import { S3ConfigLoader } from '../loaders/s3.loader';

export const options: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [ServerConfigLoader, S3ConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  envFilePath: ['.env', '.env.local', '.env.test'],
};
