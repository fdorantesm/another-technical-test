import { registerAs } from '@nestjs/config';
import { ServerConfigType } from '@app/config/types/server.type';
import { ConfigLoader } from '@app/config/loaders/config.loader';

export const ServerConfigLoader = registerAs(
  'server',
  (): ServerConfigType => ConfigLoader().server,
);
