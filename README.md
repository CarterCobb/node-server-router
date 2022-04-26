# node-server-router

This packages provides and easy way to create dynamic routing on your [NodeJS](https://nodejs.org/en/) & [ExpressJS](https://expressjs.com/) server. It allows you to add API route files to any directory and bind them all to the ExpressJS [Application](https://expressjs.com/en/api.html#app) instance.

[![NPM version](https://img.shields.io/npm/v/node-server-router.svg?style=flat-square)](https://www.npmjs.com/package/node-server-router)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/CarterCobb/node-server-router/graphs/commit-activity)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](ttps://github.com/CarterCobb/node-server-router#readme)
[![LICENSE](https://img.shields.io/github/license/CarterCobb/node-server-router)](https://github.com/CarterCobb/node-server-router/blob/main/LICENSE)

## Prerequisites

As most NodeJS projects require, please ensure you have NodeJS installed; install [here](https://nodejs.org/en/download/)

## Install

Using `npm`:

```shell
npm install node-server-router --save
```

Using `yarn`

```shell
yarn add node-server-router
```

## Usage

### ECMAScript Modules

Basic usage:

```javascript
import express from "express";
import * as nsr from "node-server-router";

const app = express();
nsr.RouteFactory.applyRoutesTo(app);

app.listen(6969);
```

### CommonJS

Basic usage:

```javascript
const nsr = require("node-server-router");
const app = require("express")();

nsr.RouteFactory.applyRoutesTo(app);

app.listen(6969);
```

Using options config settings:

```javascript
const nsr = require("node-server-router");
const app = require("express")();

nsr.RouteFactory.applyRoutesTo(app, {
  api_version: "/v1",
  log_configured: true,
  route_dir: "routes",
});

app.listen(6969);
```

### Route Structure

All route files need to follow the following structure:

```javascript
import { HTTPAction } from "node-server-router";

// @type {Array<Route>}
export default [
    {
        url: "/dog:id",
        action: HTTPAction.GET,
        handlers: [...]
    }
];
```

## Documentation

### Config

Configuration will allow you to specify unique items to your server. _All config properties are optional._

Example config structure:

```javascript
const config = {
    route_dir: "routes",
    api_version: "/v1",
    log_configured: false
}
```

#### Options

| Prop name | Optional | type | Default | Description |
| --------- | -------- | ---- |------- |----------- |
| `route_dir` | yes | `string` | `routes` | The folder were your routes reside. e.g if the passed values is `routes` it will be interpreted as `./routes`; `/folder1/folder2` is `./folder1/folder2`. |
| `api_version` | yes | `string` | `/` | API verison identifier. e.g '/v1' resulting in `http://localhost:6969/v1/...` |
| `log_configured` | yes | `boolean` | `false` | Logs to the console when routes are successfully configured. |

Example usage of any or all combinations of config props:

```javascript
// ...
nsr.RouteFactory.applyRoutesTo(app, { route_dir: "/services/main/routes" });
// ...
```

## Examples

You can find simple examples for the 4 supported types of Node.js Servers:

- JavaScript:
  - [ESM Example](https://github.com/CarterCobb/node-server-router/tree/main/examples/esm/JavaScript)
  - [CJS Example](https://github.com/CarterCobb/node-server-router/tree/main/examples/cjs/JavaScript)
- TypeScript:
  - [ESM Example](https://github.com/CarterCobb/node-server-router/tree/main/examples/esm/TypeScript)
  - [CJS Example](https://github.com/CarterCobb/node-server-router/tree/main/examples/cjs/TypeScript)

## License

[MIT](https://github.com/CarterCobb/node-server-router/blob/main/LICENSE)
