const express = require("express")
const swggerUi = require("swagger-ui-express")
const swaggerDocs = require('./configs/SwaggerConfig')
const cors = require('cors');

const user = require('./users/routes')

const generoFilmeRoutes = require('./generosfilmes/routes');
const generoRoutes = require('./generos/routes');
const filmeRoutes = require('./filmes/routes');
const avaliacaoRoutes = require('./avaliacoes/routes');

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json())

app.use('/api-docs', swggerUi.serve, swggerUi.setup(swaggerDocs))

app.use('/user', user)
app.use('/generofilme', generoFilmeRoutes)
app.use('/genero', generoRoutes)
app.use('/filme', filmeRoutes)
app.use('/avaliacao', avaliacaoRoutes)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});
