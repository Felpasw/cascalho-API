const handleResponse = (res, response) => {
  if (response) {
    if (response.errors) return res.status(400).json(response.errors)

    return res.status(200).json(response)
  }

  return res.sendStatus(404)
}

const get = async (req, res) => {
  const facade = require(`../facade/${req.params.route}`)
  if (req.query) {
    const response = await facade.get(req.query)
    handleResponse(res, response)
    return
  }
  const response = await facade.get()
  handleResponse(res, response)
}
const getById = async (req, res) => {
  const facade = require(`../facade/${req.params.route}`)
  if (req.params.route === 'archive') {
    const response = await facade.getById(req.params.id, req.query.version)
    handleResponse(res, response)
    return
  }
  const response = await facade.getById(req.params.id)
  handleResponse(res, response)
}
const insert = async (req, res) => {
  const facade = require(`../facade/${req.params.route}`)
  console.log(req.body)

  if (req.file) {
    const response = await facade.insert(req.body, req.file)
    handleResponse(res, response)
    return
  }
  const response = await facade.insert(req.body)
  handleResponse(res, response)
}
const update = async (req, res) => {
  const facade = require(`../facade/${req.params.route}`)
  const response = await facade.update(req.params.id, req.body, req.file)
  handleResponse(res, response)
}
const remove = async (req, res) => {
  const facade = require(`../facade/${req.params.route}`)
  if (!facade) return res.sendStatus(404)
  const response = await facade.remove(req.params.id)
  handleResponse(res, response)
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}
