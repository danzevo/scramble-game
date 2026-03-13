import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, context }) => {
    return `${timestamp} [${context || 'App'}] ${level}: ${message}`
});

export const winstonConfig = {
    level: 'info',
    format: combine(
        timestamp(),
        logFormat,
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp(),
                logFormat,
            ),
        }),
        
        new winston.transports.DailyRotateFile({
            filename: 'logs/app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
        })
    ]
}