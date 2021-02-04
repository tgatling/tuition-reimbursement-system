import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import * as dotenv from 'dotenv';

import publicDir from './constant';
// Routers
import indexRouter from './routes/index';
import usersRouter from './routes/user.router';
import applicationRouter from './routes/application.router';
import reimbursementRouter from './routes/reimbursement.router';
import individualRouter from './routes/individual.router';
import messageRouter from './routes/message.router';
import myRouter from './routes/my.router';

dotenv.config();
var app = express();

app.use(cors({origin:process.env.CLIENT, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));
app.use(session({
  secret: 'whatever',
  store: new (MemoryStore(session))({checkPeriod: 86400000}),
  cookie: {}}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/applications', applicationRouter);
app.use('/reimbursements', reimbursementRouter)
app.use('/employee', individualRouter)
app.use('/messages', messageRouter)
app.use('/form', myRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any , res: any, next: Function) {
  // set locals, only providing error in development
  /* res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 */
  // render the error page
  res.status(err.status || 500);
  res.sendFile('/error.html', {root: publicDir});
  //res.render('error');
});

module.exports = app;
