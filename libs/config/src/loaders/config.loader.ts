import { DatabaseConfigType } from '@app/config/types/database.type';
import { EnvironmentEnum } from '../types/environment.type';
import { ServerConfigType } from '../types/server.type';

export const ConfigLoader = (): ConfigLoader => ({
  server: {
    env: process.env.NODE_ENV as EnvironmentEnum,
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: process.env.DATABASE_AUTOLOAD === 'true',
    migrationsTableName: 'migrations',
    logging: process.env.DATABASE_LOGGING === 'true',
    runMigrations: process.env.DATABASE_RUN_MIGRATIONS === 'true',
    tls:
      process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
  },
});

type ConfigLoader = {
  server: ServerConfigType;
  database: DatabaseConfigType;
};
