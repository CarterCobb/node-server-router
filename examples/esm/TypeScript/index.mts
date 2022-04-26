import { RouteFactory, RouteFactoryOptions } from "node-server-router";
import express, { Application } from "express";

const app: Application = express();

const config: RouteFactoryOptions = {
  api_version: "/v1",
  log_configured: true,
  route_dir: "routes",
};

RouteFactory.applyRoutesTo(app, config);

app.listen(6969, () => console.log("started"))

// Need to add conditions in RoutFactory.ts to look for tsconfig files and get the outDir prop from it.