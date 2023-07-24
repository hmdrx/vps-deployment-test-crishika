// library import
import morgan from 'morgan';
import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
const rateLimit = require('express-rate-limit');

// module import
import globalErrorHandler from './controllers/errorController';

//Router
import questionsRouter from './routes/question.routes';
import userRouter from './routes/user.routes';
import subjectRouter from './routes/subject.routes';
import readRouter from './routes/attempt/readAttempt.routes';
import questionAttemptRouter from './routes/attempt/questionAttempt.routes';
import reportRouter from './routes/attempt/report.routes';
import inquiryRouter from './routes/inquiry.routes';
import path from 'path';

const app: Application = express();

// middleware

app.use(cors());
app.use(compression());

const limiter = rateLimit({
  max: 2, // 2 request per IP in 24 Hours
  windowMs: 24 * 60 * 60 * 1000, //  24 hour in miliseconds
  message: 'You already submitted inquiry!', // if exceeds the limits
});

app.use('/api/v1/inquiry/guest', limiter); // rate limit for api

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/api/v1/question', questionsRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/read-attempt', readRouter);
app.use('/api/v1/question-attempt', questionAttemptRouter);
app.use('/api/v1/report', reportRouter);
app.use('/api/v1/inquiry', inquiryRouter);
app.use('*', (_req, res, _next) => {
  res.status(404).json({
    message: 'Page Not Found!',
  });
  // res.sendFile(
  //   path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
  // );
});

app.use(globalErrorHandler);

export default app;
