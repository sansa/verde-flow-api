import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VerdeFlow API",
      version: "1.0.0",
      description: "Commit-aware API efficiency tracking system",
    },
    servers: [
      {
        url: "http://localhost:5001/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.js"], // Automatically scans route and controller files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
