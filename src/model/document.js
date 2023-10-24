const Joi = require("joi")

const object = Joi.object().keys({
  folderId: Joi.number().label("Pasta"),
  userId: Joi.number().required().label("Usuário"),
})

module.exports = { object }
