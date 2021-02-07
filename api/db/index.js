/*
mongoose setting. Mongoose for more easy working with data base mongo db
_____________________________

Подключение монгуста для более легкой работы с базами данных mongo
*/

const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/blogpost',
     {  useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, }
      )
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db