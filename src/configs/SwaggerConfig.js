const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Users',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: [
        './src/users/routes.js'] // Caminho para os arquivos de rotas 
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;