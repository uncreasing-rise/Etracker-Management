import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Etracker API',
    version: '1.0.0',
    description: 'API documentation for the Etracker application',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
}

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/Routes/*.ts'], // Path to the API docs
}

const swaggerSpec = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
