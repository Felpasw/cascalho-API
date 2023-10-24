const db = require('../config/db')

const get = async (tableName, limit = 10, page = 1) => {
  const offset = (page - 1) * limit

  const baseQuery = db(tableName).where('deleted_at', null)

  const result = await baseQuery
    .clone()
    .select()
    .limit(limit)
    .offset(offset)
    .catch((error) => {
      console.log(error.message)
      return []
    })

  const count = await baseQuery
    .clone()
    .count('id as quantity')
    .first()
    .catch((error) => {
      console.log(error.message)
      return []
    })

  return {
    data: result,
    actualPage: page,
    total: count.quantity
  }
}

const getById = async (id, tableName) => {
  const result = await db(tableName)
    .select()
    .where('id', id)
    .where('deleted_at', null)
    .first()
    .catch((err) => {
      return false
    })
  return result
}

const insert = async (object, tableName) => {
  const result = await db(tableName)
    .insert(object)
    .then()
    .catch((err) => {
      console.log(err)
      return { errors: err.message }
    })

  return await getById(result[0], tableName)
}

const update = async (object, id, tableName) => {
  const result = await db(tableName)
    .update(object)
    .where('id', id)
    .then(() => {
      return db(tableName).select('*').where('id', id).first()
    })
    .catch((err) => {
      return { errors: err.message }
    })
  return await result
}

const remove = async (id, tableName) => {
  const result = await db(tableName)
    .update({ deleted_at: new Date() })
    .where('id', id)
    .catch((err) => {
      return false
    })
  return result
}

const login = async (tableName, email) => {
  const result = await db(tableName)
    .select()
    .where('email', email)
    .where('deleted_at', null)
    .first()
    .catch((err) => {
      console.log(err)
      return false
    })
  return result
}

const getItemByRelationId = async (id, tableName, columnName) => {
  const result = await db(tableName)
    .select()
    .where(columnName, id)
    .where('deleted_at', null)
    .catch((err) => {
      console.log(err)
      return false
    })

  return result
}

module.exports = {
  getItemByRelationId,
  get,
  getById,
  insert,
  update,
  remove,
  login
}
