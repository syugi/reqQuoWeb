const { config, Group }   = require('coolsms-node-sdk')
const { ReqQuo, SendMsg } = require('../models');

const BASE_URL   = 'http://hknusu.com';

config.init({ 
  apiKey : process.env.SMS_API_KEY, 
  apiSecret : process.env.SMS_API_SECRET
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

  const post = SendMsg.create({
    ReqQuoId: reqId,
    reqDate: reqDate,
    toTelNo: params.to,
    fromTelNo: params.from,
    subject: params.subject,
    contents: params.text,
    msgType: params.type,
    sendYn: sendYn,
    errMsg: errMsg,
  });
 
}

exports.sendToCompany = async (reqId) => {
  console.log('sendToCompany------_> ',reqId);
  try {
    const reqQuo = await ReqQuo.findOne({ where: { id: reqId } });
    if (reqQuo) {
      const contents =  await getMsgContents(reqQuo);
      const params = {
        subject : "["+process.env.COMPANY_NAME+"] 견적요청입니다.", // 제목 (LMS 필수)
        text    : contents,              // 문자 내용
        to      : process.env.SMS_TELNO, // 수신번호 (받는이 :업체)
        from    : process.env.SMS_TELNO, // 발신번호
        type    : "LMS"                  // LMS , 구분(SMS,LMS,알림톡) 
      }
      send(params,reqId,reqQuo.reqDate);

    }else{
      console.error('조회실패!!');
    }
  } catch (error) {
    console.error(error);
  }
}

const getMsgContents = async (reqQuo) => {
  const detailUrl = BASE_URL + "/admin/detail?id="+reqQuo.id;
  return `[${reqQuo.upjong} 견적요청]\n요청자명 : ${reqQuo.custNm}(${reqQuo.custType})\n전화번호 : ${reqQuo.telNo}\n주소 : ${reqQuo.addr}\n견적상세보기 : ${detailUrl}`
}
