const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const compression  = require('compression');

const indexRouter    = require('./routes/indexRouter');
const companyRouter  = require('./routes/companyRouter');
const reqQuoteRouter = require('./routes/reqQuoteRouter');
const adminRouter    = require('./routes/adminRouter');
const fileTest       = require('./test/fileTest'); //파일 테스트 

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression()); //데이터 양을 줄이기 위한 압축 미들웨어

app.use('/'         , indexRouter   );
app.use('/company'  , companyRouter );
app.use('/reqQuote' , reqQuoteRouter);
app.use('/msadmin'    , adminRouter   );

 
app.use('/fileTest' , fileTest      ); //파일 테스트


app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

module.exports = app;
