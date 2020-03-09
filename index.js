const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8080;
const pass = 'arsenal12'
const MONGODB_URL = `${process.env.MONGODB_URL}mongodb+srv://mrfreez:${pass}@terminals-gzluh.gcp.mongodb.net/test?retryWrites=true&w=majority`;

const routers = require('./routers/api')

mongoose.connect(MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
mongoose.connection.on('connected', () => console.log("Подключение в MongoDB успешно выполнено"))
mongoose.connection.on('error', (err) => console.log('ошибка', err.message))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:'true'}))
app.use(morgan('tiny'))
app.use('/', routers)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('terminals/build'))
}
app.listen(PORT, 'localhost', (err)=>{
    if(err) console.log(err.message);
    console.log(`Сервер запущен, port: ${PORT}`)
})