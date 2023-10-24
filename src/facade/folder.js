const validation = require('../model/folder')
const { messages } = require('joi-translation-pt-br')
const db = require('../dbo/base')

const get = async (query) => {
  if (query.userId) {
    return await db.getItemByRelationId(query.userId, 'folder', 'user_id')
  }
  return
}
const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'folder')
}
const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      messages
    })
    return await db.insert(object, 'folder')
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
  return await db.update(object, id, 'folder')
}
const remove = async (id) => {
  if (!id) return
  return await db.remove(id, 'folder')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
