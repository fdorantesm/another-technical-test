import * as Joi from 'joi';
import { EnvironmentEnum } from '@app/config/types/environment.type';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(EnvironmentEnum))
    .default(EnvironmentEnum.DEVELOPMENT),
  DATABASE_TYPE: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().allow(''),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SSL: Joi.string().default('false'),
  DATABASE_RUN_MIGRATIONS: Joi.string(),
  DATABASE_SYNC: Joi.string(),
});
