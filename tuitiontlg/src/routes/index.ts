import express from 'express';
import path from 'path';
import log from '../log';


const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", (req: any, res, next) => {
  log.trace('index GET /');
  res.render('Hello');
});

export default indexRouter;