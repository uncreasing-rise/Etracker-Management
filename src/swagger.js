const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  components: {
    schemas: {
      Admin: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique identifier for the admin',
          },
          name: {
            type: 'string',
            description: 'Name of the admin',
          },
          email: {
            type: 'string',
            description: 'Email address of the admin',
          },
          role: {
            type: 'string',
            description: 'Role of the admin',
          },
        },
        required: ['id', 'name', 'email', 'role'],
      },
      // Define other schemas here as needed
    },
  },
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/Routes/*.js'], // Adjust the path to match your JavaScript files
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { setupSwagger };
