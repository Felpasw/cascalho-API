const db = require('../dbo/base')
const validation = require('../model/comment')
const { messages } = require('joi-translation-pt-br')

const get = async (query) => {
  if (query.userId) {
    return await db.getItemByRelationId(query.userId, 'comment', 'user_id')
  }
  if (query.publicationId) {
    return await db.getItemByRelationId(query.publicationId, 'comment', 'publication_id')
  }
  return
}

const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'comment')
}

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      messages: messages
    })
    return await db.insert(object, 'comment')
  } catch (error) {
    if (error.details) {
      const errors = error.details.map((el) => el.message)
      return { errors }
    } else {
      return { errors: [error.message] }
    }
  }
}

const update = async (id, object) => {
  if (!id) return
  return await db.update(id, object, 'comment')
}

const remove = async (id) => {
  if (!id) return
  return await db.remove(id, 'comment')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
