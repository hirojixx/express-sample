import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = {
  NODE_ENV: undefined,
  PORT: 3000,
  SECRET_KEY: 'secretKey',
  LOG_FORMAT: 'combined',
  LOG_DIR: '../logs',
  ORIGIN: 'your.domain.com',
};
