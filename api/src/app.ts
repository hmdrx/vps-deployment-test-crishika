// library import
import morgan from 'morgan';
import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';

// module import
import globalErrorHandler from './controllers/errorController';

//Router
import questionsRouter from './routes/question.routes';
import userRouter from './routes/user.routes';
import subjectRouter from './routes/subject.routes';
import readRouter from './routes/attempt/readAttempt.routes';
import questionAttemptRouter from './routes/attempt/questionAttempt.routes';
import reportRouter from './routes/attempt/report.routes';

const app: Application = express();

// middleware
app.use(cors());
app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'));
}

app.use(express.json({ limit: '10kb' }));
app.use(express.static(`${__dirname}/public`));

//Routes
app.get('/', (_req, res, _next) => {
  res.status(200).json({
    message: 'Api running successfully...',
  });
});
app.use('/api/v1/question', questionsRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/read-attempt', readRouter);
app.use('/api/v1/question-attempt', questionAttemptRouter);
app.use('/api/v1/report', reportRouter);
app.use('*', (_req, res, _next) => {
  res.status(404).json({
    message: 'Page Not Found!',
  });
});

app.use(globalErrorHandler);

export default app;
