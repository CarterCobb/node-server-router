const nsr = require("node-server-router");
const app = require("express")();

nsr.RouteFactory.applyRoutesTo(app, {
  api_version: "/v1",
  log_configured: true,
  route_dir: "routes",
});

app.listen(6968, () => console.log("started"));
