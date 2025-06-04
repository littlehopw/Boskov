const { z } = require("zod");

const generoSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
}).strict();

module.exports = generoSchema;
