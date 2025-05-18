const prisma = require('./../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const z = require('zod');
const generoSchema = require('./genero.schema');


//GENERO
const createGenero = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = generoSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { descricao } = validate.data;

        // Verifica se já existe gênero com a mesma descrição
        const generoExistente = await prisma.genero.findUnique({
            where: { descricao },
        });

        if (generoExistente) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Este gênero já está cadastrado" });
        }

        // Criação do genero
        const genero = await prisma.genero.create({
            data: {
                descricao
            },
        });

        // Retorna o gênero criado com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(genero);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar o gênero" });
    }
}

const updateGenero = async (req, res) => {
    const { id } = req.params;

    try {
        // Validação com Zod
        const validate = generoSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { descricao } = validate.data;

        // Verifica se o gênero existe
        const generoExistente = await prisma.genero.findUnique({
            where: { id: Number(id) },
        });

        if (!generoExistente) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Gênero não encontrado' });
        }

        // Atualiza o gênero
        const generoAtualizado = await prisma.genero.update({
            where: { id: Number(id) },
            data: { descricao },
        });

        res.status(StatusCodes.OK).json(generoAtualizado);

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Não foi possível atualizar o gênero' });
    }
};

const deleteGenero = async (req, res) => {
    const { id } = req.params;

    try {
        // Verifica se o gênero existe
        const genero = await prisma.genero.findUnique({
            where: { id: Number(id) },
        });

        if (!genero) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Gênero não encontrado' });
        }

        // Atualiza o status para false (ou inativo)
        await prisma.genero.update({
            where: { id: Number(id) },
            data: { status: false },
        });

        res.status(StatusCodes.OK).json({ message: 'Gênero desativado com sucesso' });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Não foi possível deletar o gênero' });
    }
};

const getGeneros = async (req, res) => {
    try {
        const generos = await prisma.genero.findMany();
        res.status(StatusCodes.OK).json(generos);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar os gêneros" });
    }
}


module.exports = { createGenero, getGeneros, updateGenero, deleteGenero };
