import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const relative = path.join(path.relative('.', __dirname), '..');

dotenv.config({ path: `${relative}/.env` });

const options = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNC === 'true',
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  cli: {
    migrationsDir: `${relative}/database/migrations`,
  },
  entities: [`${relative}/**/*.entity{.ts,.js}`],
  migrations: [`${relative}/database/migrations/*.ts`],
  seeds: [`${relative}/database/seeds/**/*{.ts,.js}`],
  factories: [`${relative}/database/factories/**/*{.ts,.js}`],
} as DataSourceOptions & SeederOptions;

export const dataSource = new DataSource(options);
