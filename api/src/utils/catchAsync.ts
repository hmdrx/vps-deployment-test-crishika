import { NextFunction, Request, Response } from 'express';

// export default (func: Function) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     func(req, res, next).catch((err: any) => {
//       next(err);
//     });
//   };
// };

export default (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: unknown) => {
      next(err);
    });
  };
};
