const bcrypt = require('bcrypt')
const User   = require('../models/user')

module.exports = {
    generatePassword: function (email, password) {
        return new Promise(function (resolve, reject) {
            const saltRound = 10
            const emailPassword = email + password
            bcrypt.genSalt(saltRound, function (err, salt) {
                bcrypt.hash(emailPassword, salt, function (err, hash) {
                    if (!err) {
                        resolve(hash)
                    } else {
                        reject(err)
                    }
                })
            })
        })
    },

    checkPassword: function (salt, password, email) {
        return new Promise((resolve, reject) => {
            const emailPassword = email + password
            bcrypt.compare(emailPassword, salt, function (err, data) {
                if (data) {
                    resolve(data)
                } else {
                    reject(err)
                }
            });
        })
    },

    // roleAdmin: function(userId){
    //     return new Promise((resolve, reject) => {
    //         User.findByIdAndUpdate(userId, { role: 'admin' })
    //         .then(function(){
    //             resolve('admin')
    //         })
    //         .catch(function(){})
    //     })
    // },

    // roleVisitor: function(userId){
    //     return new Promise((resolve, reject) => {
    //         User.findByIdAndUpdate(userId, { role: 'visitor' })
    //         .then(function(){
    //             resolve('visitor')
    //         })
    //         .catch(function(){})
    //     })
    // }


}