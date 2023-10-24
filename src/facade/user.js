const fs = require('fs')
const validation = require('../model/user')
const { messages } = require('joi-translation-pt-br')
const db = require('../dbo/base')
const bcrypt = require('bcrypt')
const saltRounds = 10

const get = async (query) => {
  if (query.groupId) {
    return await db.getItemByRelationId(query.groupId, 'user', 'group_id')
  }
  return await db.get('user')
}

const getById = async (id) => {
  if (!id) {
    return
  }
  return await db.getById(id, 'user')
}

const insert = async (object, file) => {
  try {
    await validation.object.validateAsync(object, {
      messages
    })
    if (object.groupId) {
      const groupExists = await db.getById(object.groupId, 'group')
      if (!groupExists) {
        throw new Error('O grupo selecionado não existe')
      }
    }
    if (file) {
      const image = fs.readFileSync(file.path)
      const password = bcrypt.hashSync(object.password, saltRounds)
      return await db.insert({ ...object, image, password }, 'user')
    }
    const password = bcrypt.hashSync(object.password, saltRounds)
    return await db.insert({ ...object, password }, 'user')
  } catch (error) {
    console.log(error)
    if (error.details) {
      const errors = error.details.map((el) => el.message)
      return { errors }
    } else {
      return { errors: [error.message] }
    }
  }
}

const update = async (id, object, file) => {
  if (file && object.password) {
    const imageBuffer = fs.readFileSync(file.path)
    const password = bcrypt.hashSync(object.password, saltRounds)
    return await db.update({ ...object, image: imageBuffer, password }, id, 'user')
  } else if (!file && object.password) {
    const password = bcrypt.hashSync(object.password, saltRounds)
    return await db.update({ ...object, password }, id, 'user')
  } else if (!object.password && file) {
    console.log(file)
    const imageBuffer = fs.readFileSync(file.path)
    return await db.update({ ...object, image: imageBuffer }, id, 'user')
  } else {
    return await db.update(object, id, 'user')
  }
}

const remove = async (id) => {
  if (!id) {
    return
  }
  return await db.remove(id, 'user')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
