const minKoa = require('./min-koa2');
const app = new minKoa();

// logger
app.use(async (ctx, next) => {
  await next();
  const responseTime = ctx['X-Response-Time'];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${responseTime}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] = `${ms}ms`;
});

// response
app.use(async ctx => {
  ctx.res.end('This is min koa2');
});

app.listen(8066);