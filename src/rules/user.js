const db = require('../dbo/base')

const ruleMethod = async (user, method, id) => {
  const userGroup = await db.getById(user.group_id, 'group')
  if (userGroup.screen_id === 1) {
    return true
  }
  if (method === 'DELETE' || method === 'PUT') {
    if (document.user_id != user.id) {
      return false
    }
  }
}
module.exports = ruleMethod
