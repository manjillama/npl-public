import { Application } from 'express';
import { RateLimitRequestHandler } from 'express-rate-limit';
import routesV1 from '../routes/v1';

export function loadRoutes(app: Application, apiLimiter: RateLimitRequestHandler): void {
  app.use('/api/v1', apiLimiter, routesV1);
}
