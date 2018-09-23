const Comment = require('../models/comment')
const User    = require('../models/user')
const Article = require('../models/article')
const jwt = require('jsonwebtoken');
const { checkPassword, roleVisitor} = require('../helpers')

module.exports = {

    create : function(req,res){

        let dataComment = new Comment({
            status : req.body.status,
            user : req.id
        })

        dataComment.save()
        .then(function(comment){

            Article.findByIdAndUpdate(
                { _id : req.params.id}, 
                { $push : { comments : comment._id } } 
            )
            .then(()=>{})
            .catch(()=>{})

            res.status(200).json({
                message : `create comment success`
            })

        })
       
    },

    update : function(req,res){
        
        Comment.update(
            { _id : req.params.id},
            { status : req.body.status }
        )
        .then(function(){
            res.status(200).json({
                message : `create comment success`
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `create comment failed`
            })
        })

    },

    remove : function(req,res){
        
        Comment.findByIdAndRemove(req.params.id)
        .then(function(){
            res.status(200).json({
                message : `delete comment success`
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `delete comment failed`
            })
        })

    }
}