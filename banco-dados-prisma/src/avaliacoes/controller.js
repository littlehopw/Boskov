const prisma = require('./../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const avaliacaoSchema = require('./avaliacao.schema')

const z = require('zod')


//AVALIACAO
const createAvaliacao = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = avaliacaoSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { id_usuario, id_filme, nota, comentario } = validate.data;

        // Verifica se o usuário existe
        const usuarioExiste = await prisma.usuario.findUnique({
            where: { id: id_usuario }
        });

        if (!usuarioExiste) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Usuário não encontrado'
            });
        }

        // Verifica se o filme existe
        const filmeExiste = await prisma.filme.findUnique({
            where: { id: id_filme }
        });

        if (!filmeExiste) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Filme não encontrado'
            });
        }

        // Criação da avaliação
        const avaliacao = await prisma.avaliacao.create({
            data: {
                id_usuario,
                id_filme,
                nota,
                comentario
            },
        });

        // Retorna a avaliacao criada com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(avaliacao);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar a avaliação" });
    }
}

const deleteAvaliacao = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const avaliacaoExiste = await prisma.avaliacao.findUnique({
            where: { id }
        });

        if (!avaliacaoExiste) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Avaliação não encontrada' });
        }

        // Verifica se é o autor da avaliação ou admin
        if (req.user.id !== avaliacaoExiste.id_usuario && req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado' });
        }

        await prisma.avaliacao.update({
            where: { id },
            data: { status: false }
        });

        res.status(StatusCodes.OK).json({ message: 'Avaliação desativada com sucesso (remoção lógica).' });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao remover a avaliação' });
    }
};

const updateAvaliacao = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const avaliacaoExiste = await prisma.avaliacao.findUnique({
            where: { id }
        });

        if (!avaliacaoExiste) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Avaliação não encontrada' });
        }

        // Verifica se é o autor da avaliação ou admin
        if (req.user.id !== avaliacaoExiste.id_usuario && req.user.role !== 'admin') {
            return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acesso negado' });
        }

        const validate = avaliacaoSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { id_usuario, id_filme, nota, comentario } = validate.data;

        const avaliacaoAtualizada = await prisma.avaliacao.update({
            where: { id },
            data: {
                id_usuario,
                id_filme,
                nota,
                comentario
            }
        });

        res.status(StatusCodes.OK).json(avaliacaoAtualizada);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar avaliação' });
    }
};

const getAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await prisma.avaliacao.findMany({
            include: {
                usuario: true,
                filme: true
            }
        });
        res.status(StatusCodes.OK).json(avaliacoes);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar as avaliações" });
    }
}

module.exports = { createAvaliacao, getAvaliacoes, deleteAvaliacao, updateAvaliacao }
