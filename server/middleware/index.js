const User = require('../models/user')
const Article = require('../models/article')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

module.exports = {
    auth: function (req, res, next) {

        let token = req.headers.token
        if (token) {
            jwt.verify(token, process.env.DATA_ACCESS, function (err, decoded) {
                if (!err) {
                    User.findById(decoded.userId)
                    .then(function (user) {
                        if(user){
                            req.id = decoded.userId
                            next()
                        }
                    })
                } else {
                    res.status(500).json({
                        message : `access daniend`
                    })
                }
            })
        } else {
            res.status(500).json({
                message : `access daniend`
            })
        }
    },
    

    authData: function(req,res,next){

        Article.findById(req.params.id)
        .populate('author')
        .then(function(article){
            if(article.author._id == req.id){
                next()
            } else {
                res.status(401).json({
                    message : `access daniend`
                })
            }
        })
        .catch(function(err){
            res.status(500).json({
                message : `access daniend`
            })
        })

    },


    autDataComment: function(req,res,next){
        Comment.findById(req.params.id)
        .then(function(comment){
            if(comment.user._id == req.id){
                next()
            }
        })
        .catch(function(){
            res.status(500).json({
                message : `access daniend`
            })
        })
    }

    // roleAdmin: function(req,res,next){
    //     User.findById(req.id)
    //     .then(function(user){
    //         if(user.role === 'admin'){
    //             next()
    //         }
    //     })
    //     .catch(function(){
    //         res.status(500).json({
    //             message : `access daniend`
    //         })
    //     })
    // },

    // roleVisitor: function(req,res,next){

    //     User.findById(req.id)
    //     .then(function(user){
    //         if(user.role === 'visitor'){
    //             next()
    //         }
    //     })
    //     .catch(function(){
    //         res.status(500).json({
    //             message : `access daniend`
    //         })
    //     })

    // },

}