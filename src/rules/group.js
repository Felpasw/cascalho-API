const db = require('../dbo/base')

const ruleMethod = async (user, method, id) => {
  const userGroup = await db.getById(user.group_id, 'group')
  if (userGroup.screen_id === 1) {
    return true
  }
  if (method === 'DELETE' || method === 'PUT') {
    return false
  }
  return true
}
module.exports = ruleMethod
