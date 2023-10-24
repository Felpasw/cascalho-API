const Express = require('express')
const router = require('./router')
const cookieParser = require('cookie-parser')
const app = Express()

app.use(Express.json())
app.use(cookieParser())
app.use(Express.urlencoded({ extended: true }))
app.use(router)

app.listen(4000, () => console.log(`Sever is running!`))
