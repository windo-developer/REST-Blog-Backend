require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import server from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
import { async } from '../../../../../Library/Caches/typescript/3.8/node_modules/rxjs/internal/scheduler/async';
//import createFakeData from './createFakeData';

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

//keep the proceed
app.use(bodyParser());
app.use(jwtMiddleware);

// app instance apply
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(server(buildDirectory));
app.use(async ctx => {
  //not found && path is not start /api
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    //index.html return
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Linsten %d port', port);
});
