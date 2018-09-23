const routes = require('express').Router()
const routerUsers = require('./users')
const routerArticles = require('./articles')
const routerComments = require('./comment')

routes.use('/users', routerUsers)
routes.use('/articles', routerArticles)
routes.use('/comments', routerComments)

module.exports = routes