const express    = require('express');
const router     = express.Router();   
const template   = require('../views/template/template.js');		 
const db         = require('../model/db_conn.js');
const config     = require('../config/config');
const admin      = require('../views/admin.js');	  



router.get('/', function(req, res, next) {
  const title = "한국건축설비누수";
  const body = `${admin.login()}`;
  const link  = ``;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


router.get('/list', function(req, res, next) {
   
   const sql = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST ORDER BY REQ_ID DESC";
        
   db.query(sql, [], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);

      const title = config.company_name;
      const body = `${admin.list(result)}`;
      const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
      const script = ``;
      const html = template.HTML(title,link, body,script);
      res.send(html); 
     
   });  
});

router.get('/detail', function(req, res, next) {
   
   const selectReqQuote = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST WHERE REQ_ID = ?";
        
   db.query(selectReqQuote, [req.query.id], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);
     
      const data = result[0];
      const reqId = data.REQ_ID;
     
     //첨부파일 조회 
     const selectFileList = "SELECT FILE_SEQ, REQ_ID, ORG_FILE_NM, STR_FILE_NM, FILE_PATH, FILE_SIZE, FILE_TYPE , FILE_DESCR , USE_YN, CREATED_DT FROM ATCH_FILE_LIST WHERE REQ_ID = ? AND USE_YN = 'Y'";

     db.query(selectFileList, [reqId], function(error, fileResult){
        if(error){
          throw error;
        }

          const title = config.company_name;
          const body = `${admin.detail(data,fileResult)}`;
          const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
          const script = ``;
          const html = template.HTML(title,link, body,script);
          res.send(html); 
     });
   });  
});

  
router.post('/confirm', function(req, res, next){
	//console.log('견적요청 확인처리되었습니다.');
	res.redirect( '/admin');
});

module.exports = router;
