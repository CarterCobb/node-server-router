import { RequestHandler } from 'express';
import HttpAction from './HttpAction';

type Route = {
  url: string;
  action: HttpAction;
  handlers: Array<RequestHandler>;
};

export default Route;
