const Router = require('express').Router;
const filmeController = require('./controller');

const autenticarToken = require('../middlewares/autenticarToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const router = Router();

/**
 * @swagger
 * /filme:
 *   post:
 *     summary: Cria um novo filme
 *     description: Cria um novo filme com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do filme
 *                 example: O Poderoso Chefão
 *               diretor:
 *                 type: string
 *                 description: Nome do diretor
 *                 example: Francis Ford Coppola
 *               ano_lancamento:
 *                 type: string
 *                 format: date
 *                 description: Data de lançamento do filme
 *                 example: 1972-03-24
 *               id_genero:
 *                 type: integer
 *                 description: ID do gênero (relacionado)
 *                 example: 1
 *               duracao:
 *                 type: string
 *                 description: Duração do filme em horas (decimal)
 *                 example: "2.5"
 *               produtora:
 *                 type: string
 *                 description: Nome da produtora
 *                 example: Paramount Pictures
 *               classificacao:
 *                 type: string
 *                 description: Classificação indicativa
 *                 example: 18+
 *               poster:
 *                 type: string
 *                 description: URL do poster
 *                 example: https://example.com/poster.jpg
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Poster já cadastrado
 *       500:
 *         description: Erro interno do servidor ao criar o filme
 */
router.post('/', autenticarToken, authorizeAdmin, filmeController.createFilme);

/**
 * @swagger
 * /filme/{id}:
 *   put:
 *     summary: Atualiza um filme existente
 *     description: Atualiza os dados de um filme pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Matrix Reloaded
 *               diretor:
 *                 type: string
 *                 example: Lana Wachowski
 *               ano_lancamento:
 *                 type: string
 *                 format: date
 *                 example: 2003-05-15
 *               id_genero:
 *                 type: integer
 *                 example: 1
 *               duracao:
 *                 type: string
 *                 example: "2.3"
 *               produtora:
 *                 type: string
 *                 example: Warner Bros
 *               classificacao:
 *                 type: string
 *                 example: 16
 *               poster:
 *                 type: string
 *                 example: https://example.com/matrix.jpg
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno ao atualizar o filme
 */
router.put('/:id', autenticarToken, authorizeAdmin, filmeController.updateFilme);

/**
 * @swagger
 * /filme/{id}:
 *   delete:
 *     summary: Remove logicamente um filme
 *     description: Marca o status do filme como false (remoção lógica) pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do filme a ser removido
 *     responses:
 *       200:
 *         description: Filme removido com sucesso (status = false)
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro ao remover o filme
 */
router.delete('/:id', autenticarToken, authorizeAdmin, filmeController.deleteFilme);

/**
 * @swagger
 * /filme:
 *   get:
 *     summary: Retorna todos os filmes
 *     description: Retorna uma lista de todos os filmes cadastrados, incluindo gênero, avaliações e relações
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: O Poderoso Chefão
 *                   diretor:
 *                     type: string
 *                     example: Francis Ford Coppola
 *                   ano_lancamento:
 *                     type: string
 *                     format: date
 *                     example: 1972-03-24
 *                   id_genero:
 *                     type: integer
 *                     example: 1
 *                   duracao:
 *                     type: string
 *                     example: "2.5"
 *                   produtora:
 *                     type: string
 *                     example: Paramount Pictures
 *                   classificacao:
 *                     type: string
 *                     example: 18+
 *                   poster:
 *                     type: string
 *                     example: https://example.com/poster.jpg
 */
router.get('/', filmeController.getFilmes);

module.exports = router;
