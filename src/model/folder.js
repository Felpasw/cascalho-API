const Joi = require("joi")

const object = Joi.object().keys({
  userId: Joi.number().required().label("Usuário"),
  name: Joi.string().label("Conteúdo"),
})

module.exports = { object }
