const db         = require('../model/db_conn.js');
const dateformat = require('date-format');
const smsConf    = require('../config/sms_config');
const { config, Group } = require('coolsms-node-sdk')

config.init({ 
  apiKey : smsConf.apiKey, 
  apiSecret : smsConf.apiSecret
})
async function send (params = {},reqId,reqDate) {
  let sendYn = "N";
  let errMsg = "";
  try {
    const response = await Group.sendSimpleMessage(params)
    console.log("response : " + response);
    sendYn = "Y"; 
    
  } catch (e) {
     console.error(e);
     errMsg = JSON.stringify(e);
  }
  
  const sendDate  =  dateformat.asString('yyyyMMdd', new Date()); //발송일자
  
  //발송 내역 저장 
  const insertMsgList = "INSERT INTO SEND_MSG_LIST ( SEQ, REQ_ID, REQ_DATE, TO_TELNO, FROM_TELNO, SUBJECT, CONTENTS, MSG_TYPE, SEND_YN , SEND_DT,ERR_MSG) VALUES (0, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?)";

  db.query(insertMsgList , [ reqId, reqDate, params.to, params.from , params.subject, params.text, params.type, sendYn, sendDate, errMsg], function(error, result){
    if(error){
       console.log("발송내역 저장 오류!");
      throw error;
    }
    
     console.log("발송내역 저장 완료!");
  });
 
}

// 테스트용 
// const params = {
//   subject :"발송테스트입니다", //MMS, LMS인 경우 필수
//   text: '[쿨에스엠에스 테스트]\n이름 :허미숙\n 감사합니다.\n 견적내용 : 누수됩니다. https://reqquowebwithdb-ypbzr.run.goorm.io', // 문자 내용
//   type: 'LMS', // 발송할 메시지 타입 (SMS, LMS, MMS, ATA, CTA)
//   to: '01091798723', // 수신번호 (받는이)
//   from: '01091798723' // 발신번호 (보내는이)
// }
//send(params);

 exports.sendSms = (req,reqId,reqDate) => {
  
   console.log("전송요청 : "+JSON.stringify(req));
    
   send(req,reqId,reqDate);
   // const res = send({
   //  subject: req.subject,
   //  to: req.from, // req.to, //테스트중 
   //  text: req.text,
   //  type: req.type, 
   //  from: req.from,
   // reqData :req
   // })
     
};
  
                    