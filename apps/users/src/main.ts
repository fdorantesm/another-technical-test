import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyEvent, Callback, Context, Handler } from 'aws-lambda';
import { UsersModule } from './users.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
