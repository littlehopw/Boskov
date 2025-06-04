const Router = require('express').Router
const { genero } = require('../../prisma/prismaClient');
const generoController = require('./controller')
const router = Router()

const autenticarToken = require('../middlewares/autenticarToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin');


/**
 * @swagger
 * /genero:
 *   post:
 *     summary: Cria um novo gênero de filme
 *     description: Cria um novo gênero com a descrição fornecida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Descrição do gênero
 *                 example: Ação
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       409:
 *         description: Gênero já existente
 *       500:
 *         description: Erro interno do servidor ao criar o gênero
 */
router.post('/', autenticarToken, authorizeAdmin, generoController.createGenero);

/**
 * @swagger
 * /genero/{id}:
 *   put:
 *     summary: Atualiza um gênero de filme
 *     description: Atualiza a descrição de um gênero existente pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *                 description: Nova descrição do gênero
 *                 example: Drama
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Gênero não encontrado
 *       500:
 *         description: Erro interno do servidor ao atualizar o gênero
 */
router.put('/:id', autenticarToken, authorizeAdmin, generoController.updateGenero);

/**
 * @swagger
 * /genero/{id}:
 *   delete:
 *     summary: Deleta logicamente um gênero de filme
 *     description: Marca o gênero como inativo (status = false)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do gênero a ser desativado
 *     responses:
 *       200:
 *         description: Gênero desativado com sucesso
 *       404:
 *         description: Gênero não encontrado
 *       500:
 *         description: Erro interno do servidor ao deletar o gênero
 */
router.delete('/:id', autenticarToken, authorizeAdmin, generoController.deleteGenero);

/**
 * @swagger
 * /genero:
 *   get:
 *     summary: Retorna todos os gêneros de filmes
 *     description: Retorna uma lista de todos os gêneros cadastrados
 *     responses:
 *       200:
 *         description: Lista de gêneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do gênero
 *                     example: 1
 *                   descricao:
 *                     type: string
 *                     description: Descrição do gênero
 *                     example: Comédia
 */
router.get('/', generoController.getGeneros);

module.exports = router;