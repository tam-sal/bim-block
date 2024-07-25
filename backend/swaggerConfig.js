import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BimBlocks-API',
      version: '1.0.0',
      description: 'BimBlocks API documentation using Swagger',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? process.env.productionAPI : 'http://localhost:' + process.env.DEV_PORT,
      },
    ],

  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;