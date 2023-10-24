const db = require('../dbo/base')
const validation = require('../model/login')
const { messages } = require('joi-translation-pt-br')
const bcrypt = require('bcrypt')

const insert = async (req, res) => {
  try {
    await validation.object.validateAsync(req.body, { messages })
    const userInDb = await db.login('user', req.body.email)
    if (!userInDb) return res.sendStatus(401)
    if (await bcrypt.compare(req.body.password, userInDb.password)) {
      res.cookie('cooke', userInDb.id, {
        httpOnly: true,
        maxAge: 50000000
      })
      return res.sendStatus(200)
    }
    throw new Error('Senha inválida')
  } catch (error) {
    if (error.details) {
      const errors = error.details.map((el) => el.message)
      return res.status(400).json(errors)
    } else {
      return res.status(400).json([error.message])
    }
  }
}

module.exports = {
  insert
}
