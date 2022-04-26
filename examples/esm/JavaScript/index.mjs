import * as nsr from "node-server-router";
import express from "express";

const app = express();
nsr.RouteFactory.applyRoutesTo(app, {
  api_version: "/v1",
  log_configured: true,
  route_dir: "routes",
});

app.listen(6969, () => console.log("started"));
