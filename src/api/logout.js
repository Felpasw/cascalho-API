const insert = async (req, res) => {
  res.clearCookie('cookie')
  return res.sendStatus(200)
}

module.exports = { insert }
