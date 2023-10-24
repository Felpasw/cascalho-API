const db = require('../dbo/base')
const validation = require('../model/category')
const { messages } = require('joi-translation-pt-br')

const get = async () => {
  return await db.get('category')
}
const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'category')
}
const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      messages
    })
    return await db.insert(object, 'category')
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
  return await db.update(object, id, 'category')
}
const remove = async (id) => {
  if (!id) return
  return await db.remove(id, 'category')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
