import { Json } from '@app/commons/types/json.type';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export type ParsedQueryOptions = {
  skip: number;
  limit: number;
  with?: string[];
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
      with: query?.with?.split(',') || [],
    };

    const { options } = queryObject;

    const parsedQuery = { options };

    return param ? parsedQuery && parsedQuery[param] : parsedQuery;
  },
);
