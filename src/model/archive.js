const Joi = require("joi")

const object = Joi.object().keys({
  documentId: Joi.number().required().label("Documento"),
})

module.exports = { object }
