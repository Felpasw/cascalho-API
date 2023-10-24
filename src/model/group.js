const Joi = require("joi")

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome do grupo"),
  image: Joi.string().label("Imagem"),
})

module.exports = { object }
