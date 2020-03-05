require('dotenv').config();

const chalk = require('chalk');
const _ = require('lodash');
const config = require('config');
const Router = require('koa-router');
const combineRouters = require('koa-combine-routers');

const route = new Router();

route.get('/api/greeting', async (ctx, next) => {
  const name = ctx.query.name || 'World';
  ctx.body = {
    greeting: `Hello ${name}`,
  };
  await next()
});


const router = combineRouters(route);

module.exports = {
  router,
};