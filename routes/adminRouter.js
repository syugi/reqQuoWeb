const express    = require('express');
const router     = express.Router();   
const template   = require('../views/template/template.js');		 
const db         = require('../model/db_conn.js');
const config     = require('../config/config');
const admin      = require('../views/admin.js');	  
const cryptoLib  = require('../lib/crypto.js');
const crypto     = require('crypto');
const is         = require('is-0');
const smsSend    = require('./smsSend.js');
const smsConf    = require('../config/sms_config');
const dateformat = require('date-format');

router.get('/', function(req, res, next) {
  const title = "관리자페이지 - "+config.company_name;
  const body = `${admin.login()}`;
  const link  = ``;
  const script = ``;
  const html = template.HTML(title,link, body,script);
  res.send(html); 
});

router.post('/login', function(req, res, next){
  
  const inputId = req.body.id;
  const inputPw = req.body.pw;
  console.log("inputId : "+ inputId);
  const selectAdminUser = "SELECT ID, PASSWORD FROM ADMIN_USER_LIST WHERE ID = ? ";
  db.query(selectAdminUser, [inputId], function(error, result){
    
      if(error){
        throw error;
      }
     console.log(result);
      if(is.empty(result)){
        console.log("로그인 실패 - ID 없음!");
        const title = config.company_name;
        const body = `${admin.login()}`;
        const link  = ``;
        const script = `<script type="text/javascript">alert("존재하지 않는 ID입니다. 다시 확인해 주세요.");</script>`;
        const html = template.HTML(title,link, body,script);
        res.send(html); 
        return;
      }
         
      const password = result[0].PASSWORD;

      //입력한 비밀번호를 암호화해서 매칭 
      // crypto.randomBytes(64, (err, buf) =>{
      //   const salt = buf.toString('base64');
        crypto.pbkdf2(inputPw, 'salt', 1000, 64, 'sha512', (err, key) => {
          if (err) throw err;
        
          const cryptoPw = key.toString('base64');
          console.log("password : "+password);
          console.log("cryptoPw : "+cryptoPw);
          if(cryptoPw === password){
            console.log("로그인 성공!");
            res.redirect( '/admin/list');
            return;
          }else{
            console.log("로그인 실패 - 비밀번호 불일치!");
            const title = config.company_name;
            const body = `${admin.login()}`;
            const link  = ``;
            const script = `<script type="text/javascript">alert("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");</script>`;
            const html = template.HTML(title,link, body,script);
            res.send(html); 
            return; 
          }
        }); 
     //});  
  });
});


router.get('/list', function(req, res, next) {
   
  // const sql = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST ORDER BY REQ_ID DESC";
  
  const sql = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT, IFNULL(( SELECT MAX(SEND_YN) FROM SEND_MSG_LIST Z WHERE Z.REQ_ID = A.REQ_ID ),'N') AS SEND_YN FROM REQ_QUOTE_LIST A ORDER BY REQ_ID DESC";
  
        
   db.query(sql, [], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);

      const title = "견적요청리스트- "+config.company_name;
      const body = `${admin.list(result)}`;
      const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
      const script = ``;
      const html = template.HTML(title,link, body,script);
      res.send(html); 
     
   });  
});

router.get('/detail', function(req, res, next) {
   
   const reqId = cryptoLib.decipher('reqid',req.query.id);
  
   const selectReqQuote = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT, IFNULL(( SELECT MAX(SEND_YN) FROM SEND_MSG_LIST Z WHERE Z.REQ_ID = A.REQ_ID ),'N') AS SEND_YN FROM REQ_QUOTE_LIST A WHERE REQ_ID = ?";
        
   db.query(selectReqQuote, [reqId], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);
     
      const data = result[0];
      const reqId = data.REQ_ID;
     
     //첨부파일 조회 
     const selectFileList = "SELECT FILE_SEQ, REQ_ID, ORG_FILE_NM, STR_FILE_NM, FILE_PATH, FILE_SIZE, FILE_TYPE , FILE_DESCR , USE_YN, CREATED_DT FROM ATCH_FILE_LIST WHERE REQ_ID = ? AND USE_YN = 'Y'";

     db.query(selectFileList, [reqId], function(error, fileResult){
        if(error){
          throw error;
        }

          const title = "견적상세확인 - "+config.company_name;
          const body = `${admin.detail(data,fileResult)}`;
          const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
          const script = ``;
          const html = template.HTML(title,link, body,script);
          res.send(html); 
     });
   });  
});

router.get('/msgReSend', function(req, res, next){
	
  const reqId = cryptoLib.decipher('reqid',req.query.id);
  
   const selectReqQuote = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST A WHERE REQ_ID = ?";
        
   db.query(selectReqQuote, [reqId], function(error, result){
      if(error){
        throw error;
      }
  
      const data = result[0];
      const reqDate  =  dateformat.asString('yyyyMMdd', new Date()); //요청일자
     
      //메세지  전송
      const contents =  smsSend.getMsgContents(data.REQ_ID, reqDate, data.CUST_NM, data.TEL_NO, data.UPJONG, data.BOILER_TYPE, data.ADDR ,data.DTL_ADDR, data.EXT_ADDR, data.DESCR, data.CUST_TYPE);
      console.log('reqDate : '+reqDate+'\n contents : ' +contents);

      const params = {
          subject : smsConf.comp_subject, // 제목 (LMS 필수)
          text    : contents,             // 문자 내용
          to      : config.company_telNo, // 수신번호 (받는이 :업체)
          from    : config.company_telNo, // 발신번호
          type    : smsConf.type          // LMS , 구분(SMS,LMS,알림톡) 
     }
      //(DEV_YN !== 'Y'){//개발 모드일때는 메세지 전송하지않도록 
        smsSend.sendSms(params,reqId,reqDate);
      //}
      
	    res.redirect( `/admin/detail?id=${cryptoLib.cipher('reqid',data.REQ_ID)}`);
  });
});


router.post('/confirm', function(req, res, next){
	//console.log('견적요청 확인처리되었습니다.');
	res.redirect( '/admin/list');
});



module.exports = router;
