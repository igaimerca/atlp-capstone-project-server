import swaggerDocs from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    openapi: "1.0.0",
    definition: {
        components: { },
        info: {
            title: "My Brand API Documentation",
            description:
                "This is a REST API application for my brand ATLP Capstone project. Made with ❤️ by Aime",
            version: "1.0.0",
        },
        consumes: ["application/x-www-form-urlencoded", "application/json", "multipart/form-data"],
        produces: ["application/json"],
        basePath: "/",
    },
    apis: ["./routes/*.js"],
};

const swaggerJsdoc = swaggerDocs(options);

const _swaggerJsdoc = swaggerJsdoc;
export { _swaggerJsdoc as swaggerJsdoc };
const _swaggerUi = swaggerUi;
export { _swaggerUi as swaggerUi };