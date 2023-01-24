import { ConfigModule } from '@app/config/config.module';
import { DatabaseConfigLoader } from '@app/config/loaders';
import { options } from '@app/config/options/config.options';
import { DatabaseConfigType } from '@app/config/types/database.type';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DatabaseConfigType>('database');
        return {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          autoLoadEntities: config.autoLoadEntities,
          migrationsTableName: config.migrationsTableName,
          cli: {
            migrationsDir: 'database/migration',
          },
          logging: config.logging,
          legacySpatialSupport: false,
          ssl: config.tls,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule.forRoot(options),
  ],
})
export class DatabaseModule {}
