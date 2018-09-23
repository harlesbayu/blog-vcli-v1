const routes = require('express').Router()
const { auth } = require('../middleware')
const { signup, signin, update, remove } = require('../controllers/usersController')

routes.post('/signup', signup)
routes.post('/signin', signin)
routes.put('/update', auth, update)
routes.delete('/remove', remove)

module.exports = routes