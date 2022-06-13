import { NextFunction, Request, Response } from 'express';

export const addPatronServiceFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  req.query = { ...req.query, isEnabled: true } as any;
  next();
};
