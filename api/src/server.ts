require('dotenv').config();
import mongoose from 'mongoose';
import { Server } from 'http';

import app from './app';

// Assuming that PORT, LOCAL_DATABASE, CLOUD_DATABASE, and CLOUD_DATABASE_PASSWORD are defined and of type string in the .env file
const PORT = process.env.PORT;

// Handling uncaught exceptions for synchronous code
process.on('uncaughtException', (err: unknown) => {
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log(err);
  }

  console.log(`uncaughtException!! Shutting Down...`);
  process.exit(1);
});

// Setting the database connection string based on the environment
let DB = process.env.LOCAL_DATABASE!;
if (process.env.NODE_ENV === 'production') {
  DB = process.env.CLOUD_DATABASE!.replace(
    '<password>',
    process.env.CLOUD_DATABASE_PASSWORD!
  );
}
console.log(process.env.NODE_ENV);
console.log(DB);

// Connecting to the database
mongoose.set('strictQuery', false);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }
  });

// Starting the server
const server: Server = app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});

// Handling unhandled rejections for asynchronous code
process.on('unhandledRejection', (err: unknown) => {
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log(err);
  }
  console.log(`UNHANDLED REJECTION!! Shutting Down...`);
  server.close(() => {
    process.exit(1);
  });
});
