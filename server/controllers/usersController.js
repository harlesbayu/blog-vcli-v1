const User = require('../models/user')
var jwt = require('jsonwebtoken');
const { generatePassword, checkPassword } = require('../helpers')

module.exports = {
    
    signup: function(req,res){

        generatePassword(req.body.email, req.body.password)
        .then(function(hashpassword){
            let dataUser = new User({
                name : req.body.name,
                picture : req.body.picture,
                gender : req.body.gender,
                phone : req.body.phone,
                address : req.body.address,
                email : req.body.email,
                password : hashpassword
            })
            return  dataUser.save()
        })
        .then(function(users){
            res.status(200).json({
                users,
                message : 'register user success'
            })

        })
        .catch(function(err){
            res.status(500).json({
                err
            })
        })
    },

    signin: function(req,res){

        let user = null
        User.findOne({
            email : req.body.email
        })
        .then(function(dataUser){
            user = dataUser
            return checkPassword(dataUser.password, req.body.password, req.body.email)
        })
        .then(function(){
            jwt.sign({
                userId : user._id,
            }, process.env.DATA_ACCESS, function(err,token){
                if(!err){
                    res.status(200).json({
                        name : user.name,
                        address : user.address,
                        email: user.email,
                        token : token
                    })
                } else {
                    res.status(500).json({
                        message : `Email and password didn't match`
                    })
                }
            })
        })
        .catch(function(){
            res.status(500).json({
                message : `Email and password didn't match`
            })
        })
    },

    update: function(req,res){
        User.update(
            { _id : req.id},
            {
                name : req.body.name,
                picture : req.body.picture,
                gender : req.body.gender,
                phone : req.body.phone,
                address : req.body.address
            }
        )
        .then(function(user){
            res.status(200).json({
                user,
                message : `update user success`
            })
        })
        .catch(function(){
            res.status(500).json({
                user,
                message : `update user failed`
            })
        })
    },

    remove: function(req,res){

    }

}