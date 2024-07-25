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
        url: process.env.NODE_ENV === 'production' ? 'https://bimblocks-api.onrender.com' : 'http://localhost:3001',
      },
    ],

  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;