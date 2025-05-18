const z = require('zod')

const avaliacaoSchema = z.object({
    id_usuario: z.number().int().positive(),
    id_filme: z.number().int().positive(),
    nota: z.number().min(0).max(5),
    comentario: z.string().min(1).max(500)
}).strict();

module.exports = avaliacaoSchema