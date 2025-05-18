const z = require('zod')

const userSchema = z.object({
    nome: z.string()
        .min(1, { message: "Nome é obrigatório" })
        .max(50, { message: "Nome deve ter no máximo 50 caracteres" }),

    email: z.string()
        .email({ message: "Email inválido" })
        .min(1, { message: "E-mail obrigatório" }),

    senha: z.string()
        .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),

    data_nascimento: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de nascimento inválida (use o formato YYYY-MM-DD)" })
}).strict();

module.exports = userSchema