const Joi = require("joi")

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  icon: Joi.string().required().label("Icone"),
})

module.exports = { object }
