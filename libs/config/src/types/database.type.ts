export type DatabaseConfigType = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
  migrationsTableName: string;
  runMigrations?: boolean;
  logging?: boolean;
  tls?: boolean | { rejectUnauthorized: boolean } | { ca: string };
};
