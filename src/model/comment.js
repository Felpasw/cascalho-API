const Joi = require('joi')

const object = Joi.object().keys({
  publicationId: Joi.number().required().label('Publicação'),
  userId: Joi.number().required().label('Autor'),
  content: Joi.string().label('Conteúdo')
})

module.exports = { object }
