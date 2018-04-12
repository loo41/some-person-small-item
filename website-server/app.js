const koa = require('koa');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const static = require('koa-static');
const config = require('config');
const moment = require('moment');
const router = require('./src/router');

const app = new koa();
moment.locale('zh-cn');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'), {
  useMongoClient: true,
});

app.use(static(`${__dirname}/dist`));
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
  }
});

app.use(koaBody());

app
  .use(router.routes())
  .use(router.allowedMethods());

  module.exports = app
