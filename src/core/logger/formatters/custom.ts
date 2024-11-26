import winston from 'winston';

export const customFormat = winston.format((info) => {
  const { timestamp, level, message, ...rest } = info;

  return {
    timestamp,
    level,
    message,
    ...rest,
    environment: process.env.NODE_ENV,
    service: 'next-app',
  };
});
