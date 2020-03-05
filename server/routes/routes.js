require('dotenv').config();

const log = require('ololog');
const chalk = require('chalk');

const _ = require('lodash');
const config = require('config');
const Router = require('koa-router');
const combineRouters = require('koa-combine-routers');

const route = new Router();

const api_route_0 = '/api/greeting';
route.get(api_route_0, async (ctx, next) => {
  const name = ctx.query.name || 'World';
  ctx.body = {
    greeting: `GET: Hello ${name} from -> ${api_route_0}`,
  };
  await next();
});

const api_route_1 = '/api/get/test';
route.get(api_route_1, async (ctx, next) => {
  let query = ctx.query;
  let greeting = `GET: ${query.name} from -> route.get(${api_route_1})`;
  log.cyan(`line ${__line}: route.get(${api_route_1}) greeting`, chalk.bgGray(greeting));
  ctx.body = {
    greeting: greeting,
  };
  await next();
});

const api_route_2 = '/api/get/set-cookie-test';
route.get(api_route_2, async (ctx, next) => {
  let query = ctx.query;
  let greeting = `GET: Set Cookie ${query.name} from -> route.get(${api_route_2})`;
  ctx.cookies.set(query.name, { httpOnly: true, secure: true });
  ctx.body = {
    greeting: greeting,
  };
  await next();
});

const api_route_3 = '/api/post/set-cookie-test';
route.post(api_route_3, async (ctx, next) => {
  let query = ctx.query;
  let greeting = `POST: Set Cookie ${query.name} from -> route.get(${api_route_3})`;
  ctx.cookies.set(query.name, { httpOnly: true, secure: true });
  ctx.body = {
    greeting: greeting,
  };
  await next();
});

const router = combineRouters(route);

module.exports = {
  router,
};
