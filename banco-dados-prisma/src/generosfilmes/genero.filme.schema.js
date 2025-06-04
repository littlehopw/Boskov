const { z } = require("zod");

const generoFilmeSchema = z.object({
  id_genero: z.number({ required_error: "id_genero é obrigatório" }),
  id_filme: z.number({ required_error: "id_filme é obrigatório" }),
});

module.exports = generoFilmeSchema;
