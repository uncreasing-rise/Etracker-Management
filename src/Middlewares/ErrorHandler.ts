/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston'
import { Request, Response, NextFunction } from 'express'

// Create a logger instance
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'error.log' }),
  ],
})

// Define the error handler middleware
const errorHandler = (
  err: any, // You can define a more specific type if needed
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error
  logger.error(`Error: ${err.message}`, { stack: err.stack })

  // Respond to the client
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  })

  next() // This line can be omitted if you don't have any other middleware that needs to be executed
}

export default errorHandler
