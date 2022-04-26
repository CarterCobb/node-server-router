import { Application } from 'express';
import { readdir } from 'fs';
import process, { pid } from 'process';
import path from 'path';
import { Route, Routes } from '../types/Route.js';
import RouteFactoryOptions from '../types/RouteFactoryOptions.js';
import Defaults from '../types/Default.js';
import fs from 'fs';

const defaults: Defaults<RouteFactoryOptions> = {
  api_version: '/',
  route_dir: 'routes',
  log_configured: false,
};

export default class RouteFactory {
  /**
   * Validates the proper type to concatinate routes
   * @param obj value to check against type
   * @returns if the type is valid
   */
  private static isRoutes(obj: any): obj is Routes {
    if (Array.isArray(obj)) if (obj.length > 0) if (obj[0].url) return true;
    return false;
  }

  /**
   * Apply all routes to the Express application instance
   * @param app express app instance
   * @param options custom options for dynamic route generation
   */
  static async applyRoutesTo(app: Application, options: RouteFactoryOptions) {
    const opts = Object.assign({}, defaults, options);
    const ROUTES: Routes = [];
    let tsconfig: any = null;
    try {
      tsconfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf-8'));
    } catch {
      tsconfig = null;
    }
    const directoryPath = path.resolve(
      process.cwd(),
      tsconfig ? tsconfig.compilerOptions.outDir || '' : '',
      opts.route_dir,
    );
    readdir(directoryPath, async (err, files) => {
      /*eslint-disable */
      if (err) return console.log(`[${pid}] unable to scan directory: `, err);
      /*eslint-enable */
      for await (const file of files) {
        const ext = file.split('.').pop() || '';
        if (['ts', 'mts', 'js', 'mjs'].includes(ext)) {
          try {
            let routes: Routes = [];
            try {
              // ESM
              const filePath = `${/^win/i.test(process.platform) ? 'file:\\\\' : ''}${path.join(directoryPath, file)}`;
              routes = (await import(filePath)).default;
            } catch (e) {
              // CJS
              routes = (await import(path.join(directoryPath, file))).default;
            }
            if (this.isRoutes(routes)) ROUTES.push(...routes);
          } catch (error) {
            /*eslint-disable */
            console.log(error);
            /*eslint-enable */
            process.exit(1);
          }
        }
      }
      ROUTES.forEach((route: Route) =>
        app[route.action].bind(app)(`${opts.api_version}${route.url}`, ...route.handlers),
      );
      app.all('*', (_, res) => res.sendStatus(404));
      /*eslint-disable */
      if (opts.log_configured) console.log(`[${pid}] routes configured`);
      /*eslint-enable */
    });
  }
}
