import winston, { format } from 'winston';

const { combine, timestamp, json, simple } = format;

const formatter = process.env.APP_ENV === 'development' ? simple : json;

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), formatter()),
  defaultMeta: { service: 'unified-calendar-api-sdk' },
  transports: [
    process.env.APP_ENV === 'production'
      ? new winston.transports.Console()
      : new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export type Logger = typeof logger;
