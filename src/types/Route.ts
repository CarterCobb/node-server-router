import { RequestHandler } from 'express';

export enum HTTPAction {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
  OPTIONS = 'options',
}

export interface Route {
  url: string;
  action: HTTPAction;
  handlers: [RequestHandler];
}

export type Routes = [Route];
