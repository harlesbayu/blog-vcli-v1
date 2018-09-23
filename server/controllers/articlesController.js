const Article = require('../models/article')

module.exports = {

    findAll: function (req,res) {
        Article.find()
        .sort([['createdAt', 'descending']])
        .populate('author')
        .populate('comments')
        .then(function(articles){
            res.status(200).json({
                articles
            })
        }).catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    findOne: function (req,res) {
        Article.findById(req.params.id)
        .populate('author')
        .populate({
            path : 'comments',
            populate : { path : 'user' }
        })
        .then(function(article){
            res.status(200).json({
                article
            })
        })
    },

    findArticleUser: function (req,res) {
        Article.find({author : req.id})
        .sort([['createdAt', 'descending']])
        .populate('author')
        .populate('comments')
        .then(function(articles){
            res.status(200).json({
                articles
            })
        })
    },

    findByTitle: function(req,res){
        Article.find({title: new RegExp(req.query.title, 'i')})
        .sort([['createdAt', 'descending']])
        .populate('author')
        .populate('comments')
        .then(function(articles){
            res.status(200).json({
                articles
            })
        })
    },

    create: function (req,res) {

        let dataArticle = new Article({
            title : req.body.title,
            content  : req.body.content,
            author : req.id,
            picture : req.body.picture
        })

        dataArticle.save()
        .then(function(article){
            let articleId = article._id
            res.status(200).json({
                articleId,
                message : 'create article success'
            })
        })
        .catch(function(){
            res.status(500).json({
                message : 'create article failed'
            })
        })
    },

    update: function (req,res) {

        Article.update(
            { _id : req.params.id},
            { title : req.body.title,
              content : req.body.content
            }
        )
        .then(function(article){
            res.status(200).json({
                message : 'update article success'
            })
        })
        .catch(function(){
            res.status(500).json({
                message : 'update article failed'
            })
        })

    },

    remove: function (req,res) {
        
        Article.findByIdAndRemove(
            { _id : req.params.id},
        )
        .then(function(task){
            res.status(200).json({
                message : `delete article success`
            })
        })
        .catch(function(err){
            res.status(500).json({
                message : `delete article failed`
            })
        })
    }

}