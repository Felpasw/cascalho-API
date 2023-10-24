const fs = require('fs')
const path = require('path')

const handleFacedeExistence = async (req, res, next) => {
  const archive = req.params.route + '.js'
  const facadePath = path.join(__dirname, '..', 'facade')
  const facadeItems = fs.readdirSync(facadePath)
  if (facadeItems.includes(archive)) {
    next()
    return
  }
  return res.sendStatus(404)
}

module.exports = handleFacedeExistence
