const validation = require('../model/group')
const { messages } = require('joi-translation-pt-br')
const db = require('../dbo/base')
const fs = require('fs')

const get = async () => {
  return await db.get('group')
}

const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'group')
}

const insert = async (object, file) => {
  try {
    await validation.object.validateAsync(object, {
      messages
    })

    if (!file) return

    const image = fs.readFileSync(file.path)
    return await db.insert({ ...object, image }, 'group')
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
  if (!id) return
  if (file) {
    const image = fs.readFileSync(file.path)
    return await db.update({ ...object, image }, id, 'group')
  }
  return await db.update(object, id, 'group')
}

const remove = async (id) => {
  if (!id) return
  return await db.remove(id, 'group')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
