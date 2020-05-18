const express    = require('express');
const router     = express.Router();   
const template   = require('../views/template/template.js');		 
const db         = require('../model/db_conn.js');
const config     = require('../config/config');


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   const title = config.company_name;
//   const body  = `${reqQuote.html()}`;
//   const link  = `<link rel="stylesheet" href="/stylesheets/reqQuote.css">`;
//   const script = `
// 		<!--다음 우편번호-->
//     	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

// 		<script src="/javascripts/reqQuote.js"></script>
// 		`;
//   const html = template.HTML(title,link, body,script);
//   res.send(html);
// });

router.post('/', function(req, res, next){
	
	res.redirect( '/msadmin/list');
});


router.get('/list', function(req, res, next) {
   
   const sql = "SELECT REQ_ID, CUST_NM, TEL_NO, EMAIL_ID, EMAIL_DOWN, UPJONG, BOILER_TYPE, POST_CODE, ADDR, DTL_ADDR,EXT_ADDR, DESCR, CUST_TYPE, CREATED_DT FROM REQ_QUOTE_LIST ORDER BY REQ_ID DESC";
        
   db.query(sql, [], function(error, result){
      if(error){
        throw error;
      }
     
      console.log(result);

     let list = `<table class="min-w-full bg-white">
     <thead style="width:100%;" class="bg-gray-800 text-white">
        <tr >
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">요청자</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">휴대폰번호</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">요청업종</td>
          <th colspan="3" class="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">주소</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
        </tr>
       <!-- <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">요청업종</td>
          <th colspan="3" class="text-left py-3 px-4 uppercase font-semibold text-sm">주소</th>
        </tr> -->
      </thead>
      <tbody class="text-gray-700">`;
     
      result.forEach((data)=>{
        list += '<tr style="border-bottom:1px solid #dedede;">';
        list += `<td class="text-left py-3 px-4">${data.REQ_ID}</td>`;
         list += `<td class="text-left py-3 px-4">${data.CUST_NM}</td>`;
         list += `<td class="text-left py-3 px-4"><a class="hover:text-blue-500" href="tel:${data.TEL_NO}">${data.TEL_NO}</a></td>`;
         list += `<td class="text-left py-3 px-4 hidden md:table-cell">${data.UPJONG}</td>`;
        list += `<td colspan="3" class="text-left py-3 px-4 hidden md:table-cell" >${data.ADDR}</td>`;
         list += `<td class="text-left py-3 px-4 w-20"> 
         <!-- <a href="#" class="text-grey-lighter font-bold py-1 px-1 rounded text-xs bg-green hover:bg-green-dark">Edit</a>-->
             <a href="/msadmin/detail?id=${data.REQ_ID}"  class="font-bold text-xs bg-green">상세보기</a>
         </td> `;
        // list += '</tr><tr>';
        // list += `<td class="text-left py-3 px-4">${data.UPJONG}</td>`;
        // list += `<td colspan="3" class="text-left py-3 px-4" >${data.ADDR}</td>`;
        list += '</tr>';
      });		

      list += `</tbody>
              </table>`;
     
      const title = config.company_name;
      const body  = `
            <section style="order:3; width:100%; ">
              <div style="font-family: 'Do Hyeon', Sans-serif;" class="py-10 text-3xl text-center " >견적 현황</div>

              <div style="max-height:500px;" class="shadow overflow-auto rounded border-b border-gray-200 ">
              ${list}
              </div>
             </section>`;
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
     
         let fileList = "";
         fileResult.forEach((file)=>{
           fileList += `<div class="text-left py-3 px-4"><img src="../uploads/${file.STR_FILE_NM}" alt="" class="max-w-full h-auto"></div>`;
           fileList += `<div class="text-left py-3 px-4">[${file.FILE_SEQ}] ${file.ORG_FILE_NM} ${file.FILE_DESCR}</div>`;
         });		
       
       
          const title = config.company_name;
          const body  = `-
                <section style="order:3; width:100%; overflow:auto background: #f2f2f2;">
                  <form method="POST" enctype="multipart/form-data" action="/admin/confirm">  
                    <table>
                      <tr class="hidden">
                        <td class="text-right py-3 px-4">REQ ID</td>
                        <td>${data.REQ_ID}</td>
                      </tr>
                      <tr>
                        <td class="w-24 text-right py-3 font-bold">이름</td>
                        <td class="px-4">${data.CUST_NM} (${data.CUST_TYPE == null? "" : data.CUST_TYPE})</td>
                      </tr>
                       <tr>
                        <td class="text-right py-3 font-bold">휴대폰 번호</td>
                        <td class="px-4">${data.TEL_NO}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 font-bold">요청 업종</td>
                        <td class="px-4">${data.UPJONG}</td>
                      </tr>
                      <tr class="hidden">
                        <td class="text-right py-3 font-bold">보일러 구분</td>
                        <td class="px-4">${data.CUST_TYPE == null? "" : data.BOILER_TYPE}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 font-bold">주소</td>
                        <td class="px-4">${data.ADDR} ${data.DTL_ADDR} ${data.EXT_ADDR}</td>
                      </tr>
                      <tr>
                        <td class="text-right py-3 font-bold">상세내용</td>
                        <td class="px-4">${data.DESCR}</td>
                      </tr>
                      
                    </table> 

                    <div class="py-3 px-4 font-bold">첨부파일(현장사진)</div>
                    ${fileList}

                    <p class="py-4">
                       <input type="submit" value="확인" name="submit">
                    </p>
                  </form>
                 </section>
`;
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
