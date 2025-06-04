const Router = require('express').Router
const { user } = require('../../prisma/prismaClient');
const userController = require('./controller')
const autenticarToken = require('../middlewares/autenticarToken');
const authorizeAdmin = require('../middlewares/authorizeAdmin');

const router = Router()

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: senha123
 *               date_birth:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento do usuário
 *                 example: 2005-01-01
 *               role:
 *                 type: string
 *                 description: Niveis de usuario
 *                 example: admin
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno do servidor ao criar o usuário
 */
router.post('/', userController.createUsuario);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove (logicamente) um usuário
 *     description: Altera o status do usuário para false (remoção lógica)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao tentar remover o usuário
 */
router.delete('/:id', autenticarToken, authorizeAdmin, userController.deleteUsuarios);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     description: Atualiza os dados de um usuário com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Novo nome do usuário
 *                 example: Maria Oliveira
 *               email:
 *                 type: string
 *                 description: Novo e-mail
 *                 example: maria@email.com
 *               senha:
 *                 type: string
 *                 description: Nova senha
 *                 example: novaSenha123
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Nova data de nascimento
 *                 example: 1995-03-15
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno ao tentar atualizar
 */
router.put('/:id', autenticarToken, userController.updateUsuarios);

/**
* @swagger
* /user:
*   get:
*     summary: Retorna todos os usuários
*     description: Retorna uma lista de todos os usuários cadastrados
*     responses:
*       200:
*         description: Lista de usuários
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   id:
*                     type: integer
*                     description: ID do usuário
*                     example: 1
*                   name:
*                     type: string
*                     description: Nome do usuário
*                     example: João Silva
*/
router.get('/', autenticarToken, authorizeAdmin, userController.getUsuarios);

router.post('/login', userController.loginUsuario);

router.post('/logout', autenticarToken, userController.logoutUsuario);

module.exports = router