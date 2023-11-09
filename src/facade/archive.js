const db = require('../dbo/base')
const validation = require('../model/archive')
const fs = require('fs')
const { messages } = require('joi-translation-pt-br')

const get = async (query) => {
  try {
    if (query.documentId) {
      const documents = await db.getItemByRelationId(
        query.documentId,
        'documenttoarchive',
        'document_id'
      )
      console.log(documents)
      const archives = await documents.map(async (document) => {
        return await db.getById(document.archiveId, 'archive')
      })
      console.log(archives)
      return await Promise.all(archives)
    }
    throw new Error('Documento é obrigatório')
  } catch (error) {
    return { errors: error.message }
  }
}

const getById = async (id) => {
  if (!id) return
  return await db.getById(id, 'archive')
}

const insert = async (object, file) => {
  try {
    if (!file || !object.documentId) throw new Error('Arquivo ou documento ausente')

    await validation.object.validateAsync(object, { messages })

    const document = await db.getById(object.documentId, 'document')

    if (!document) throw new Error('Documento não existe')

    const archive = await db.insert(
      {
        name: object.name ? object.name : file.filename
      },
      'archive'
    )
    await db.insert(
      {
        archive_id: archive.id,
        document_id: document.id
      },
      'documenttoarchive'
    )

    document.version = +1
    await db.update({ ...document, archive_id: archive.id }, object.id, 'document')

    return archive
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

const remove = async (id) => {
  if (!id) return
  await db.removeArchiveToDocumentRelation(id, 'archive_id')
  const documentRelated = await db.getItemByRelationId(id, 'document', 'archive_id')
  if (documentRelated) {
    await db.update({ ...documentRelated, archiveId: null }, documentRelated.id, 'document')
  }
  return await db.remove(id, 'archive')
}

module.exports = {
  get,
  getById,
  insert,
  remove
}
