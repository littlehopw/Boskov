const z = require('zod')

const filmeSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    diretor: z.string().min(1, "O diretor é obrigatório"),
    ano_lancamento: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Data de lançamento inválida",
    }),

    id_genero: z.number().int("O ID do gênero deve ser um número inteiro"),
    duracao: z.number().positive("A duração deve ser um número positivo"),

    produtora: z.string().min(1, "A produtora é obrigatória"),
    classificacao: z.string().min(1, "A classificação é obrigatória"),
    poster: z.string().url("O poster deve ser uma URL válida"),

}).strict();

module.exports = filmeSchema