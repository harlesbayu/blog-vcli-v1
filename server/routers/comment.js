const routes = require('express').Router()
const { auth, autDataComment } = require('../middleware')
const { signin, create, update, remove} = require('../controllers/commentsController')

routes.post('/:id', auth, create)
routes.put('/update/:id', auth, autDataComment, update)
routes.delete('/remove/:id', auth, autDataComment, remove)

module.exports = routes