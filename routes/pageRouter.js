const express  = require('express'); 
const router   = express.Router();

 /* GET home page. */
 router.get('/', (req, res, next) => {
	res.render('main', { title: process.env.COMPANY_NAME+" : 누수탐지전문공사"});
 });

 router.get('/company', (req, res, next) => {
	res.render('company', { title: process.env.COMPANY_NAME+" : 회사소개"});
 });
 
 router.get('/reqQuote', (req, res, next) => {
	res.render('reqQuote', { title: process.env.COMPANY_NAME+" : 견적문의"});
 });

 router.get('/reqQuoteResult', (req, res, next) => {
	res.render('reqQuote', { title: process.env.COMPANY_NAME+" : 견적문의완료" , result : true});
 });

 module.exports = router;
