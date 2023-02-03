import { Json } from '@app/commons/types/json.type';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type ParsedQueryOptions = {
  skip: number;
  limit: number;
};

export type ParsedQuery = {
  [key: string]: Json;
  options?: ParsedQueryOptions;
};

export const QueryParser = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const queryObject: ParsedQuery = query;

    const limit = Number(query.limit || 10);

    queryObject.options = {
      limit,
      skip: (Number(query.page || query.page || 1) - 1) * limit,
    };

    const { options } = queryObject;

    const parsedQuery = { options };

    return param ? parsedQuery && parsedQuery[param] : parsedQuery;
  },
);
