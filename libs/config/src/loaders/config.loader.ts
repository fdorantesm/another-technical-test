import { DatabaseConfigType } from '@app/config/types/database.type';
import { EnvironmentEnum } from '../types/environment.type';
import { ServerConfigType } from '../types/server.type';
import { S3ConfigType } from '../types/s3.type';

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
  s3: {
    region: process.env.AWS_REGION,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: process.env.AWS_ENDPOINT,
  },
});

type ConfigLoader = {
  server: ServerConfigType;
  database: DatabaseConfigType;
  s3: S3ConfigType;
};
