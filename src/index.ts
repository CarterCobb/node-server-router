import * as path from 'path';
import * as fs from 'fs';
import Defaults from './types/Default';
import RegisterOptions from './types/RegisterOptions';
import Route from './types/Route';
import Routes from './types/Routes';

const defaults: Defaults<RegisterOptions> = {
  api_version: '',
  route_dir: 'routes',
  log_configured: false,
};

/**
 * Validates the proper type to concatinate routes
 * @param obj value to check against type
 * @returns if the type is valid
 */
const isRoutes = (obj: any): obj is Routes => {
  if (Array.isArray(obj)) if (obj.length > 0) if (obj[0].url) return true;
  return false;
};

/**
 * Register routers to the Express application instance.
 * @param options registration options
 */
const resgisterRoutes = async (options: RegisterOptions) => {
  const opts = Object.assign({}, defaults, options);
  var ROUTES: Routes = [];
  console.log(process.argv[1]);
  const routes_path: string = path.join(process.argv[1], '../', opts.route_dir);
  console.log(routes_path);
  fs.readdir(routes_path, async (err, files) => {
    console.log('MADE IT', err?.message);
    if (err) throw err;
    for await (var file of files) {
      console.log(file);
      try {
        const { default: routes } = await import(path.join(routes_path, file));
        if (isRoutes(routes)) ROUTES = ROUTES.concat(routes);
      } catch (error) {
        console.log(error);
      }
    }
    ROUTES.forEach((route: Route) => opts.app[route.action].bind(opts.app)(route.url, ...route.handlers));
    opts.app.all('*', (_, res) => res.sendStatus(404));
    if (opts.log_configured) console.log(`[${process.pid}] routes configured`);
  });
};

export { resgisterRoutes, Route, Routes, RegisterOptions };
