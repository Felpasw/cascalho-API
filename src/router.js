const express = require('express')
const cors = require('cors')
const api = require('./api/base')
const multer = require('multer')
const auth = require('./middlewares/auth')
const multerConfig = require('./config/multer')
const handleFacedeExistence = require('./middlewares/handleFacadeExistence')
const login = require('./api/login')
const logout = require('./api/logout')
const path = require('path')

const router = express.Router()

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  router.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
  next()
})

router.get('/ping', (req, res) => {
  return res.status(200).json({ msg: 'pong' })
})
router.post('/login', login.insert)

router.post('/logout', logout.insert)

router.get(`/:route`, auth, handleFacedeExistence, api.get)

router.post(
  `/:route`,
  auth,
  handleFacedeExistence,
  multer(multerConfig).single('archive'),
  api.insert
)

router.put(
  `/:route/:id`,
  auth,
  handleFacedeExistence,
  multer(multerConfig).single('archive'),
  api.update
)

router.delete(`/:route/:id`, auth, handleFacedeExistence, api.remove)
router.get(`/:route/:id`, auth, handleFacedeExistence, api.getById)

module.exports = router
