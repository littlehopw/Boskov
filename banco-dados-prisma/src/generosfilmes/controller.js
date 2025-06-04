const prisma = require('./../../prisma/prismaClient');
const { StatusCodes } = require('http-status-codes')
const z = require('zod');
const generoFilmeSchema = require('./genero.filme.schema');


//GENEROFILME
const createGeneroFilme = async (req, res) => {

    try {

        //Faz a validação com o Zod
        const validate = generoFilmeSchema.safeParse(req.body);

        //Devolve erro caso a validação falhe
        if (!validate.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.format() });
        }

        const { id_genero, id_filme } = validate.data;

        // Verifica se essa relação já existe
        const relacaoExistente = await prisma.generoFilme.findFirst({
            where: {
                id_genero,
                id_filme,
            },
        });

        if (relacaoExistente) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Essa relação já existe" });
        }

        // Cria a relação
        const novaRelacao = await prisma.generoFilme.create({
            data: {
                id_genero,
                id_filme,
            },
        });

        // Retorna a relação criada com o status correto baseado no protocolo HTTP.
        res.status(StatusCodes.CREATED).json(novaRelacao);

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: error.errors });
        }
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível criar a relação" });
    }
}

const getGenerosFilmes = async (req, res) => {
    try {
        const generosFilmes = await prisma.generoFilme.findMany();
        res.status(StatusCodes.OK).json(generoFilme);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Não foi possível buscar as relações" });
    }
}


module.exports = { createGeneroFilme, getGenerosFilmes }
