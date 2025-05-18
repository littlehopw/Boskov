const Router = require('express').Router
const { user } = require('../../prisma/prismaClient');
const avaliacaoController= require('./controller')

const autenticarToken = require('../middlewares/autenticarToken');

const router = Router()

/**
 * @swagger
 * /avaliacao:
 *   post:
 *     summary: Cria uma nova avaliação de um filme
 *     description: Cria uma nova avaliação vinculada a um usuário e um filme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: ID do usuário que avaliou
 *                 example: 1
 *               id_filme:
 *                 type: integer
 *                 description: ID do filme avaliado
 *                 example: 5
 *               nota:
 *                 type: number
 *                 format: float
 *                 description: Nota atribuída ao filme
 *                 example: 4.5
 *               comentario:
 *                 type: string
 *                 description: Comentário sobre o filme
 *                 example: Muito bom, recomendo!
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       500:
 *         description: Erro interno do servidor ao criar a avaliação
 */
router.post('/', autenticarToken, avaliacaoController.createAvaliacao);

/**
 * @swagger
 * /avaliacao/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     description: Atualiza os dados de uma avaliação informando o ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_filme:
 *                 type: integer
 *                 example: 5
 *               nota:
 *                 type: number
 *                 format: float
 *                 example: 4.8
 *               comentario:
 *                 type: string
 *                 example: Atualizei minha opinião após rever o filme.
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor ao atualizar a avaliação
 */
router.put('/:id', autenticarToken, avaliacaoController.updateAvaliacao);

/**
 * @swagger
 * /avaliacao/{id}:
 *   delete:
 *     summary: Deleta logicamente uma avaliação
 *     description: Marca a avaliação como inativa usando o campo status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação a ser deletada
 *     responses:
 *       200:
 *         description: Avaliação desativada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro interno do servidor ao deletar a avaliação
 */
router.delete('/:id', autenticarToken, avaliacaoController.deleteAvaliacao);

/**
 * @swagger
 * /avaliacao:
 *   get:
 *     summary: Retorna todas as avaliações
 *     description: Retorna uma lista com todas as avaliações cadastradas
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da avaliação
 *                     example: 1
 *                   id_usuario:
 *                     type: integer
 *                     description: ID do usuário que avaliou
 *                     example: 1
 *                   id_filme:
 *                     type: integer
 *                     description: ID do filme avaliado
 *                     example: 5
 *                   nota:
 *                     type: number
 *                     format: float
 *                     description: Nota atribuída
 *                     example: 4.0
 *                   comentario:
 *                     type: string
 *                     description: Comentário sobre o filme
 *                     example: Excelente fotografia!
 *       500:
 *         description: Erro interno ao buscar as avaliações
 */
router.get('/', autenticarToken, avaliacaoController.getAvaliacoes);

module.exports = router;