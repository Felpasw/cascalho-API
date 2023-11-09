const Express = require('express')
const router = require('./router')
const cookieParser = require('cookie-parser')
const app = Express()

app.use(Express.json())
app.use(cookieParser())
app.use('/static/images', Express.static('uploads'))

app.use(router)
app.use(Express.urlencoded({ extended: true }))

app.listen(4000, () => console.log(`Sever is running!`))
