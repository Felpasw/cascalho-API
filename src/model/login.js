const Joi = require("joi")

const object = Joi.object().keys({
  email: Joi.string().required().label("Email"),
  password: Joi.string().required().label("Senha"),
})

module.exports = { object }
