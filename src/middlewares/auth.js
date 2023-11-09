const db = require('../dbo/base')

const authMiddleware = async (req, res, next) => {
  if (!req.cookies.cooke) {
    return res.sendStatus(401)
  } else {
    const user = await db.getById(req.cookies.cooke, 'user')
    if (!user) {
      return res.sendStatus(401)
    }
    next()
    // if (req.params.route === 'static') {
    //   next()
    //   return
    // } else {
    //   const ruleMethod = require(`../rules/${req.params.route}`)
    //   if (await ruleMethod(user, req.method, req.params.id)) {
    //     next()
    //   }
    // }
  }
}

module.exports = authMiddleware
