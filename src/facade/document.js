const db = require('../dbo/base')
const validation = require('../model/document')
const fs = require('fs')
const { messages } = require('joi-translation-pt-br')

const get = async (query) => {
  if (!query.userId) return
  return await db.getItemByRelationId(query.userId, 'document', 'user_id')
}

const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'document')
}

const insert = async (object, file) => {
  try {
    if (!file) throw new Error('Arquivo ausente')
    await validation.object.validateAsync(object, { messages })

    const archiveBuffer = fs.readFileSync(file.path)

    if (!(await db.getById(object.userId, 'user'))) throw new Error('Usuário informado não existe')

    if (object.folderId) {
      if (!(await db.getById(object.folderId, 'folder')))
        throw new Error('Pasta selecionada não existe')
    }
    const document = await db.insert({ ...object, version: 1 }, 'document')

    const archive = await db.insert({ archive: archiveBuffer, name: file.filename }, 'archive')

    const documentUpdated = await db.update({ archive_id: archive.id }, document.id, 'document')

    await db.insert({ archive_id: archive.id, document_id: document.id }, 'documenttoarchive')

    return documentUpdated
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
  await db.update(object, id, 'document')
}

const remove = async (id) => {
  if (!id) return
  return await db.remove(id, 'document')
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
