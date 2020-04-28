const mysql = require('mysql');
const dbConfig = require('../config/db_config');
const smsConf    = require('../config/sms_config');
const smsSend    = require('../lib/smsSend.js');

const db =  mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
}); 

db.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");

   const sql = `SELECT * FROM SEND_MSG_LIST WHERE SEND_YN != 'Y'`;
   db.query(sql, function (err, result) {
      if (err) throw err;

      if(result.length > 0){
        
        const contents = result[0].CONTENTS;
        const telNo = result[0].TO_TELNO;
        
        //업체에 견적요청 메시지 발송 
        const params = {
          subject : smsConf.comp_subject, // 제목 (LMS 필수)
          text    : contents,             // 문자 내용
           to      : smsConf.comp_telNo,   // 수신번호 (받는이 :업체)
          from    : telNo,             // 발신번호 (보낸이 :고객)
          type    : smsConf.type          // 구분(SMS,LMS,알림톡) 
        }
        var res = {result: false};
        smsSend.sendSms(params,res);
        
        
         console.log(result[0]);
         console.log("res----------------> "+res);
        
      }else{
         console.log(`메세지 전송 대상이 없습니다.`);
      }
   });
 
});

