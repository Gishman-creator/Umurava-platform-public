import { Request, Response, NextFunction } from 'express';

type AsyncFunction<T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction
) => Promise<any>;

export default <T extends Request>(fn: AsyncFunction<T>) => 
    (req: T, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }; 