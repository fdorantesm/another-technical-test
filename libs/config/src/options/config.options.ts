import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { configSchema } from '@app/config/schemas/config.schema';
import { ServerConfigLoader } from '@app/config/loaders';

export const options: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: [ServerConfigLoader],
  validationSchema: configSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
  envFilePath: ['.env', '.env.local', '.env.test'],
};
