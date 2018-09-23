const routes = require('express').Router()
const { auth, authData } = require('../middleware')
const images = require('../helpers/image');
const { findAll, findOne, findArticleUser, findByTitle, create, update, remove } = require('../controllers/articlesController')

routes.get('/findarticle', findByTitle)
routes.get('/findArticleUser', auth, findArticleUser)
routes.get('/', findAll)
routes.get('/:id', findOne)


routes.post('/create', auth, create)
routes.put('/update/:id', auth, authData, update)
routes.delete('/remove/:id', auth, authData, remove)

routes.post(
    "/upload/image",
    images.multer.single('image'),
    images.sendUploadToGCS,
    (req, res) => {
      res.send({
        status: 200,
        message: "Your file is successfully uploaded",
        link: req.file.cloudStoragePublicUrl
      })
    } 
);


module.exports = routes