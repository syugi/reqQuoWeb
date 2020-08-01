const express  = require('express');
const router   = express.Router();
const template = require('../views/template/template.js');		

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = process.env.COMPANY_NAME+" : 회사소개";
  const body = `${company.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/company.css">`;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


module.exports = router;
