const Joi = require("joi")

const object = Joi.object().keys({
  idPublication: Joi.string().required().label("Publicação"),
  authorId: Joi.number().required().label("Autor"),
  content: Joi.string().label("Conteúdo"),
})

module.exports = { object }
