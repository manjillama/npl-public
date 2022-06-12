/* eslint-disable import/newline-after-import, import/first */
import dotenv from 'dotenv';
dotenv.config();

import 'express-async-errors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import compression from 'compression';
import { loadDB, loadRoutes } from './startup';
import error from './middlewares/error.middleware';
import { keys } from './config';

// Change default timezone ¯\_(ツ)_/
process.env.TZ = 'Europe/Amsterdam';

const app = express();
app.locals.version = keys.APP_VERSION;
app.locals.title = 'Public restroom API server';

app.set('trust proxy', true);

// Parse incoming requests with JSON
app.use(express.json());
// Request logging
app.use(morgan(keys.LOGS));
// Enable CORS - Cross Origin Resource Sharing
app.use(cors({ origin: keys.CORS_WHITELISTS, credentials: true }));
// secure apps by setting various HTTP headers
app.use(helmet());
// Data sanitization against NOSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Gzip response compression
app.use(compression());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.get('/api/version', (req: Request, res: Response) => {
  res.json({
    latest: req.app.locals.version,
  });
});

loadRoutes(app, apiLimiter);
loadDB();

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
