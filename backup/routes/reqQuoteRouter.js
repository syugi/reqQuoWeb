const express    = require('express');
const router     = express.Router();   
const template   = require('../views/template/template.js');		
const reqQuote   = require('../views/reqQuote.js');	 
const db         = require('../model/db_conn.js');
const smsSend    = require('./smsSend.js');
const dateformat = require('date-format');
const multer     = require('multer');	
const is         = require('is-0')
const cryptoLib  = require('../lib/crypto.js');

const DEV_YN     = 'N';

/* File Upload */
const storage = multer.diskStorage({ 
  destination(req, file, callback) { 
    callback(null, 'public/uploads'); 
  }, 
  filename(req, file, callback) { 
    let array = file.originalname.split('.'); 
    //array[0] = array[0] + '_'; array[1] = '.' + array[1]; 
    //array.splice(1, 0, Date.now().toString()); 
    //const result = array.join(''); 
    const result =  Date.now().toString() +'.' + array[1];
    console.log(">>>result :  "+result); 
    callback(null, result); 
  } 
}); 

const upload = multer({ 
  storage, 
  limits: { 
    files: 10, fileSize: 1024 * 1024 * 1024, 
  } 
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  const title = process.env.COMPANY_NAME+" : 견적문의";
  const body  = `${reqQuote.html()}`;
  const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
  const script = `
		<!--다음 우편번호--> 
    	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

		<script src="/javascripts/reqQuote.js"></script>
		`;
  const html = template.HTML(title,link, body,script);
  res.send(html);
});


router.post('/save', upload.array('img_file'), function(req, res, next){
	//console.log('견적요청 전송되었습니다.');
	//res.redirect( '/reqQuote');

 
  //견적요청
	const post = req.body;
	console.log("post --> "+JSON.stringify(post));
	
  
  // ID 생성
  const selectReqId = "SELECT MAX(IFNULL(REQ_ID,0))+1 AS REQ_ID FROM REQ_QUOTE_LIST";
  db.query(selectReqId, [], function(error, result){
    if(error){
      console.error("ID 생성 오류");
      throw error;
    }
     let reqId = result[0].REQ_ID;
     if(is.empty(reqId)){
       reqId = 0;
     }
    console.log("생성된 ID : "+reqId);
    const reqDate  =  dateformat.asString('yyyyMMdd', new Date()); //요청일자
    
    
    //견적요청 저장
    const insertReqList = "INSERT INTO REQ_QUOTE_LIST ( REQ_ID, CUST_NM, TEL_NO, REQ_DATE, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE ) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)";

      db.query(insertReqList, [ reqId, post.custNm, post.telNo, reqDate, null, null, post.upjong, post.boilerType, post.postCode, post.addr, post.dtlAddr, post.extAddr, post.descr, post.custType], function(error, result){
        if(error){
          console.error("견적요청 저장 오류");
          throw error;
        }

        //메세지  전송
        const contents =  smsSend.getMsgContents(reqId, reqDate, post.custNm, post.telNo, post.upjong, post.boilerType, post.addr ,post.dtlAddr, post.extAddr, post.descr, post.custType);
        console.log('reqDate : '+reqDate+'\n contents : ' +contents);
        
        const params = {
            subject : "["+process.env.COMPANY_NAME+"] 견적요청입니다.", // 제목 (LMS 필수)
            text    : contents,              // 문자 내용
            to      : process.env.SMS_TELNO, // 수신번호 (받는이 :업체)
            from    : process.env.SMS_TELNO, // 발신번호
            type    : "LMS"                  // LMS , 구분(SMS,LMS,알림톡) 
       }
        if(DEV_YN !== 'Y'){//개발 모드일때는 메세지 전송하지않도록 
          smsSend.sendSms(params,reqId,reqDate);
        }
        
        //첨부파일 저장
        const files = req.files; 
        console.log(files);
        if(is.empty(files)){
          
          console.log('견적요청 저장되었습니다.');
          res.redirect( '/reqQuote/result');
          
        }else{

            files.forEach((file, index)=>{
            console.log(`file inform : ${file.originalname},  ${file.filename},  ${file.mimetype},  ${file.size}`); 

            const insertFileList = "INSERT INTO ATCH_FILE_LIST ( FILE_SEQ, REQ_ID, ORG_FILE_NM, STR_FILE_NM, FILE_PATH, FILE_SIZE, FILE_TYPE, FILE_DESCR, USE_YN ) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)";

            db.query(insertFileList , [ index, reqId, file.originalname, file.filename,  file.path, file.size, file.mimetype, '', 'Y'], function(error, result){
              if(error){
                console.error("첨부파일 저장 오류");
                throw error;
              }        
            });
            
          });
          
          console.log('견적요청 저장되었습니다.');
          res.redirect( '/reqQuote/result');
          
        }
    }); 

  });       
  
});


router.get('/result', function(req, res, next) {
    const title = process.env.COMPANY_NAME+" : 견적문의완료";
    const body  = `${reqQuote.result()}`;
    const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
    const script = ``;
    const html = template.HTML(title,link, body,script);
    res.send(html); 
});


function getMsgContents(reqId, reqDate, custNm, telNo, upjong, boilerType, addr, dtlAddr, extAddr, descr, custType){
  
    const detailUrl = BASE_URL + "/admin/detail?id="+cryptoLib.cipher('reqid',reqId);
  
    return `[${upjong} 견적요청]\n요청자명 : ${custNm}(${custType})\n전화번호 : ${telNo}\n주소 : ${addr}\n견적상세보기 : ${detailUrl}`
}



module.exports = router;
