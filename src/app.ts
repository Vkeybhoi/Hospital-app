import createError, {HttpError} from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import  mongoose from 'mongoose';
import connectDb from './config/config';
import { config } from 'dotenv';

config()
// console.log(process.env.MONGO_URL)
connectDb()



import  indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
// Connect to MongoDB
// mongoose.connect(config.mongo.url, {retryWrites: true, w: "majority"})
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((err) => {
//         console.log("Not Connected to MongoDB ERROR! ", err);
//     });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default  app;
