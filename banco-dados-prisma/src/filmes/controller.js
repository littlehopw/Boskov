const prisma = require('./../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const z = require('zod');
const filmeSchema = require('./filmes.schema');


//FILMES
const createFilme = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = filmeSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { nome, diretor, ano_lancamento, id_genero, duracao, produtora, classificacao, poster } = validate.data;

        // Verifica unicidade do poster
        const existingPoster = await prisma.filme.findUnique({
            where: { poster }
        });

        if (existingPoster) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Este poster já está cadastrado" });
        }


        // Criação do filme
        const filme = await prisma.filme.create({
            data: {
                nome,
                diretor,
                ano_lancamento: new Date(ano_lancamento),
                id_genero,
                duracao,
                produtora,
                classificacao,
                poster
            },
        });

        // Retorna o filme criado com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(filme);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar o filme" });
    }
}

const deleteFilme = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o filme existe
        const filme = await prisma.filme.findUnique({
            where: { id: Number(id) },
        });

        if (!filme) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Filme não encontrado" });
        }

        // Atualiza o status para false (remoção lógica)
        await prisma.filme.update({
            where: { id: Number(id) },
            data: { status: false },
        });

        res.status(StatusCodes.OK).json({ message: "Filme removido com sucesso (status = false)" });

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao remover o filme" });
    }
}

const updateFilme = async (req, res) => {
    try {
        const { id } = req.params;

        // Validação com Zod
        const validate = filmeSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const dados = validate.data;

        // Verifica se o filme existe
        const filmeExistente = await prisma.filme.findUnique({
            where: { id: Number(id) },
        });

        if (!filmeExistente) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Filme não encontrado" });
        }

        // Atualização
        const filmeAtualizado = await prisma.filme.update({
            where: { id: Number(id) },
            data: {
                ...dados,
                ano_lancamento: new Date(dados.ano_lancamento),
            }
        });

        res.status(StatusCodes.OK).json(filmeAtualizado);

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao atualizar o filme" });
    }
}


const getFilmes = async (req, res) => {
    try {
        const filmes = await prisma.filme.findMany();
        res.status(StatusCodes.OK).json(filmes);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar os filmes" });
    }
}

module.exports = { createFilme, getFilmes, deleteFilme, updateFilme }
