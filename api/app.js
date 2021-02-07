/*
It's a basic part of server app. All basic things get assignment here

_______________________

Это основная часть приложения. Здесь задаются все основые вещи
*/

const createError = require('http-errors');
// error handler
// создатель запросов ошибок в http

const express = require('express');
// server
// серверная часть

const path = require('path');
// work with directories and files
// работа с директориями и файлами

const cookieParser = require('cookie-parser');
// parse Cookie header and populate req.cookies with an object keyed by the cookie names
// чтение куки-файлов в заголовках запросов и разширение запросов куки, через объект с ключом имени в куки

const logger = require('morgan');
// logging of requests, format of responses. And tokens also
// запись журнала запросов и токенов(объектов с прописанными правами доступа)

const bodyParser = require('body-parser');
// parsing of request's body
// чтение тела запросов

const cors = require('cors');
// for working at one url with two ports
// модуль для совместной работы через два порта в одном url

const db = require('./db')
// data base
// база данных

const postRouter = require('./routes/post-router');
// routing for post
// маршрутиризация url для постов

const indexRouter = require('./routes/index');
// routind for index page
// маршрутиризация url для основной страницы

const userRouter = require('./routes/userRouter');
// routing for users
// маршрутиризация url для пользователей

const app = express();
// overriding of server app
// переопределение для сервера

const dotenv = require("dotenv");

dotenv.config();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// установки для отображения представления, осталось от npx


app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: true }));
// It parses incoming requests with urlencoded payloads. And only looks at requests where the Content-Type header matches the type option
// Считывает входящие запросы, закодированные в url

app.use(bodyParser.json());
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body)

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter)
// use executed every time the app receives a request
// use используется для каждого запроса в приложении по заданному маршруту


app.use(function(req, res, next) {
  next(createError(404));
});
// catch 404 and forward to error handler
// перехват и передача обработчику ошибок


// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render('error');
  // render the error page
  // фомирование страницы с ошибками
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// data base on
// подключение базы данных

module.exports = app;
