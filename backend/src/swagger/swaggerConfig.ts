import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express): void => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My Chat app",
        version: "1.0.0",
        description: "API documentation for Chat app",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: ["./src/routes/*.ts", "./src/swagger/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
