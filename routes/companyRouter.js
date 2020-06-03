const express = require('express');
const router = express.Router();
const template = require('../views/template/template.js');		
const company = require('../views/company.js');	  


/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = "회사소개 - "+"한국건축설비누수";
  const body = `${company.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/company.css">`;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


module.exports = router;
