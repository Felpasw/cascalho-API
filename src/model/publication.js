const Joi = require("joi")

const object = Joi.object().keys({
  userId: Joi.number().required().label("Autor"),
  description: Joi.string().label("Descrição"),
  categoryId: Joi.number().required().label("Categoria"),

})

module.exports = { object }
