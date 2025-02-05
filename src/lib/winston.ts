import winston from "winston";


let logger: winston.Logger;

export const getLogger = () => {
    if (!logger) {
        logger = winston.createLogger({
            transports: [new winston.transports.Console()],
        });
    }
    return logger
}

export const letlogger = winston.createLogger({
  transports: [new winston.transports.Console()],
});
