const express  = require('express')
const routes   = require('./routers')
const cors     = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const app     = express()
const port    = process.env.PORT

if(process.env.DATA_TESTING == 'test'){
  mongoose.connect(process.env.URL_MONGO_LOCAL_TEST, {useNewUrlParser : true})
} else {
  mongoose.connect(process.env.URL_MONGO_LOCAL, {useNewUrlParser : true})
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', routes)

app.listen(port, function(){
    console.log('Listening on port ', port)
})

module.exports = app