const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		
const company  = require('../views/company.js');	  
const config   = require('../config/config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = config.company_name+" : 회사소개";
  const body = `${company.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/company.css">`;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


module.exports = router;
