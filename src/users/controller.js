const prisma = require('./../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const userSchema = require('./user.shema')
const bcrypt = require('bcrypt')
const env = require('dotenv').config();
const jwtConfig = require('../configs/jwtConfig');
const { isTokenBlacklisted } = require('../configs/jwtConfig');

const z = require('zod')


//USUARIO
const createUsuario = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = userSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { nome, email, senha, data_nascimento, role } = validate.data;

        // Verificação de unicidade do e-mail (manual, já que Zod não faz isso)
        const verifyEmail = await prisma.usuario.findUnique({
            where: { email },
        });

        if (verifyEmail) {
            return res.status(StatusCodes.CONFLICT).json({
                error: "Este e-mail já está cadastrado",
            });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Criação do usuário
        const user = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaCriptografada,
                data_nascimento: new Date(data_nascimento),
                role
            },
        });

        // Retorna o usuário criado com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(user);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar o usuário" });
    }
}

const deleteUsuarios = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await prisma.usuario.findUnique({ where: { id } });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuário não encontrado" });
        }

        if (req.user.id !== id && req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ error: "Acesso negado" });
        }
          
        const deletedUser = await prisma.usuario.update({
            where: { id },
            data: { status: false }
        });

        res.status(StatusCodes.OK).json({ message: "Usuário desativado com sucesso", user: deletedUser });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível deletar o usuário" });
    }
}

const updateUsuarios = async (req, res) => {
    try {
        const id = Number(req.params.id);

        // Impede usuários comuns de alterar outros perfis
        if (req.user.id !== id && req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ error: "Acesso negado" });
        }

        const validate = userSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { nome, email, senha, data_nascimento } = validate.data;

        const userExists = await prisma.usuario.findUnique({ where: { id } });
        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuário não encontrado" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const updatedUser = await prisma.usuario.update({
            where: { id },
            data: {
                nome,
                email,
                senha: senhaCriptografada,
                data_nascimento: new Date(data_nascimento)
            }
        });

        res.status(StatusCodes.OK).json(updatedUser);

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível atualizar o usuário" });
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwtConfig.generateToken(usuario);
    res.status(200).json({ token });
};

const logoutUsuario = (req, res) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwtConfig.blacklistToken(token);
        res.status(200).json({ message: 'Logout realizado com sucesso' });
    } catch {
        res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
}

const autenticarToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    // Verifica se o token está na blacklist
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) return res.sendStatus(403);

    try {
        const user = jwtConfig.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
};

const getUsuarios = async (req, res) => {
    try {
        const users = await prisma.usuario.findMany();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar os usuários" });
    }
}

module.exports = { createUsuario, getUsuarios, updateUsuarios, deleteUsuarios, loginUsuario, logoutUsuario, autenticarToken }
