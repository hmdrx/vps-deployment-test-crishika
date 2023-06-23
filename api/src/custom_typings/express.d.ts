declare namespace Express {
  import { IUser } from './models/userModel';
  // Extend the Request interface with a user property
  export interface Request {
    // user: import('./models/userModel').IUser; // You can use a more specific type here
    user: IUser; // You can use a more specific type here
  }
}

// import { IUser } from './models/userModel';

// declare module 'express' {
//   interface Request {
//     user: IUser;
//   }
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user: IUser; // or any other type you want
//     }
//   }
// }

// declare namespace Express {
//   export interface Request {
//     user: any;
//     // other properties
//   }
// }
