import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './dataSource';
import fileRoute from './fileRoute';
// import bodyParser from 'body-parser';
import { Buffer } from 'buffer';

global.Buffer = global.Buffer || Buffer;

const app = express();
const port = process.env.PORT || 8888;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


AppDataSource.initialize().catch((error) => {
  console.error('Failed to connect to database:', error);
});

// fetch patient data endpoint
app.use('/api/v1/configs', fileRoute);

// 404 Handler — runs when no route matches
 
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.locals.status = 404;
  next(error);
});

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  const message = res.locals?.message || err.message;
  const statusCode = res.locals?.status  || 500;
  console.log(`${message}: ${err.stack}`);
  res.status(statusCode).json({
    code: statusCode,
    message: message
  });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
