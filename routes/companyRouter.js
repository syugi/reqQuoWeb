const express = require('express');
const router = express.Router();
const template = require('../views/template/template.js');		
const company = require('../views/company.js');	  


/* GET users listing. */
router.get('/', function(req, res, next) {
  const category = req.query.category;

  let body = "";
  
  if(category == null){
     body  = `${company.html()}`;
  }else{
     body  = `${eval("company."+category+"()")}`;
  }
  
  const title = "한국건축설비누수";
  const link  = `<link rel="stylesheet" href="/stylesheets/company.css">`;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


module.exports = router;
