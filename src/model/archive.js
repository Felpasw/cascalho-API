const Joi = require('joi')

const object = Joi.object().keys({
  documentId: Joi.number().required().label('Documento'),
  name: Joi.string().label('Nome')
})

module.exports = { object }
