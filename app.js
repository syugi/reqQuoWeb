var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var companyRouter = require('./routes/company');
var reqQuoteRouter = require('./routes/reqQuote');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/reqQuote', reqQuoteRouter);

module.exports = app;
