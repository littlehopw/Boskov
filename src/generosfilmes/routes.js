const Router = require('express').Router
const router = Router()
const generoFilmeController = require('./controller');

/**
 * @swagger
 * /generoFilme:
 *   post:
 *     summary: Relaciona um gênero a um filme
 *     description: Cria uma nova relação entre um gênero e um filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_genero:
 *                 type: integer
 *                 description: ID do gênero
 *                 example: 1
 *               id_filme:
 *                 type: integer
 *                 description: ID do filme
 *                 example: 10
 *     responses:
 *       201:
 *         description: Relação gênero-filme criada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       409:
 *         description: Relação já existente
 *       500:
 *         description: Erro interno ao criar a relação
 */
router.post('/', generoFilmeController.createGeneroFilme);

/**
 * @swagger
 * /generoFilme:
 *   get:
 *     summary: Lista todas as relações entre gêneros e filmes
 *     description: Retorna todas as relações de gênero com filme, incluindo detalhes dos registros relacionados
 *     responses:
 *       200:
 *         description: Lista de relações gênero-filme
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da relação
 *                     example: 1
 *                   id_genero:
 *                     type: integer
 *                     description: ID do gênero
 *                     example: 1
 *                   id_filme:
 *                     type: integer
 *                     description: ID do filme
 *                     example: 10
 *                   genero:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       descricao:
 *                         type: string
 *                         example: Aventura
 *                   filme:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       nome:
 *                         type: string
 *                         example: Vingadores: Ultimato
 *       500:
 *         description: Erro interno ao buscar as relações
 */
router.get('/', generoFilmeController.getGenerosFilmes);

module.exports = router;
