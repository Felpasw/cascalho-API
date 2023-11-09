const validation = require('../model/publication')
const { messages } = require('joi-translation-pt-br')
const document = require('../facade/document')
const archive = require('../facade/archive')
const db = require('../dbo/base')

const get = async (query) => {
  if (query.categoryId) {
    return await db.getItemByRelationId(query.categoryId, 'publication', 'category_id')
  }
  if (query.userId) {
    return await db.getItemByRelationId(query.userId, 'publication', 'user_id')
  }
  return await db.get('publication')
}

const getById = async (id) => {
  if (!id) return

  return await db.getById(id, 'publication')
}

const insert = async (object, file) => {
  try {
    await validation.object.validateAsync(object, {
      messages
    })
    console.log(file)
    const categoryExists = await db.getById(object.categoryId, 'category')

    const userExists = await db.getById(object.userId, 'user')

    if (!categoryExists) throw new Error('Categoria selecionada não existe')

    if (!userExists) throw new Error('Usuário selecionado não existe')

    if (file) {
      console.log(object)
      const Document = await document.insert({ userId: object.userId }, file)
      console.log(Document)
      return await db.insert({ ...object, document_id: Document.id }, 'publication')
    }

    return await db.insert(object, 'publication')
  } catch (error) {
    if (error.details) {
      const errors = error.details.map((el) => el.message)
      return { errors }
    } else {
      return { errors: [error.message] }
    }
  }
}

const update = async (id, object, file) => {
  if (file) {
    const publication = await db.getById(id, 'publication')
    await archive.insert({ ...object, documentId: publication.document_id }, file)
    return await db.update(object, id, 'publication')
  }
  return db.update(object, id, 'publication')
}

const remove = async (id) => {
  if (!id) return

  return await db.remove(id, 'publication')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
