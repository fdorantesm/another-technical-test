import { ConfigLoader } from '@app/config/loaders';
import { DatabaseConfigType } from '@app/config/types/database.type';
import { registerAs } from '@nestjs/config';

export const DatabaseConfigLoader = registerAs(
  'database',
  (): DatabaseConfigType => ConfigLoader().database,
);
