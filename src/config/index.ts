export const CREDENTIALS = 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = {
  NODE_ENV: 'development',
  PORT: 3000,
  SECRET_KEY: 'secretKey',
  LOG_FORMAT: 'short',
  LOG_DIR: '../logs',
  ORIGIN: 'your.domain.com',
} as const;
