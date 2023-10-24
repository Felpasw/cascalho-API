const Joi = require("joi")

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  email: Joi.string().required().label("E-mail"),
  password: Joi.string().required().label("Senha"),
  groupId: Joi.string().label("Grupo pertencente")
})

module.exports = { object }
