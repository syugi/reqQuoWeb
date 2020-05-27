const cryptoLib     = require('../lib/crypto.js');

module.exports = {
	
    login : function(){
		  return loginSection();
    }
    ,list : function(result){
      return listSection(result);
    }
   ,detail : function(data,fileResult){
      return detailSection(data,fileResult);
    }
}

function loginSection(){
  return `
      <section class="login_section py-20 w-full bg-gray-200" style="order:3;">
            <h2 style="font-family: 'Do Hyeon', Sans-serif;" class="text-3xl font-midium text-center py-4">관리자 로그인</h2>
            <div class="w-full flex justify-center">
                <form class="max-w-2xl" method="POST" action="/admin/login" >
                  <div class="mb-4">
                    <label class="block text-md font-light mb-2" for="username">Username</label>
                    <input class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="id" id="" placeholder="Username">
                  </div>
                  <div class="mb-4">
                    <label class="block text-md font-light mb-2" for="password">Password</label>
                    <input class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="pw" id="" placeholder="Password">
                  </div>

                  <div class="w-full mb-5">
                    <input type="submit"  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded focus:outline-none focus:shadow-outline" value="LOGIN" name="submit">
                    <!-- <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded focus:outline-none focus:shadow-outline" type="button">
                      LOGIN
                    </button> -->
                    
                  </div>
                </form>
          </div>
    </section>
        `;
}


function listSection(result){
  
  let list = `<table class="min-w-full bg-white">
     <thead style="width:100%;" class="bg-gray-800 text-white">
        <tr >
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">요청자</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">휴대폰번호</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">요청업종</td>
          <th colspan="3" class="text-left py-3 px-4 uppercase font-semibold text-sm hidden md:table-cell">주소</th>
          <th class="text-center py-3 px-4 uppercase font-semibold text-sm">전송여부</th>
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
        list += `<td class="text-center py-3 px-4 w-16 md:w-24 ">${data.SEND_YN}</td>`;
        list += `<td class="text-left py-3 px-4 w-20 md:w-24"><a href="/admin/detail?id=${cryptoLib.cipher('reqid',data.REQ_ID)}" class="cursor-pointer bg-gray-700 hover:bg-gray-600 shadow-xl px-2 py-2 font-bold text-xs inline-block text-blue-100 hover:text-white rounded">상세보기</a></td>`;
        
        
        
        // list += '</tr><tr>';
        // list += `<td class="text-left py-3 px-4">${data.UPJONG}</td>`;
        // list += `<td colspan="3" class="text-left py-3 px-4" >${data.ADDR}</td>`;
        list += '</tr>';
      });		

      list += `</tbody>
              </table>`;
  
  
    return `<section style="order:3; width:100%;  height:500px;">
              <div style="font-family: 'Do Hyeon', Sans-serif;" class="py-10 text-3xl text-center " >견적 현황</div>

              <div style="max-height:500px;" class="shadow overflow-auto rounded border-b border-gray-200 ">
              ${list}
              </div>
             </section>`;
}


function detailSection(data,fileResult){
   
    let fileList = "";
         fileResult.forEach((file)=>{
           fileList += `<div class="text-left py-3 px-4"><img src="../uploads/${file.STR_FILE_NM}" alt="" class="max-w-full h-auto"></div>`;
           fileList += `<div class="text-left py-3 px-4">[${file.FILE_SEQ}] ${file.ORG_FILE_NM} ${file.FILE_DESCR}</div>`;
         });		
       
       
     return `
            <section style="order:3; width:100%;  min-height:500px; overflow:auto background: #f2f2f2;">
              <form method="POST" enctype="multipart/form-data" action="/admin/confirm">  
                <table>
                  <tr>
                    <td class="w-24 text-right py-3 font-bold">ID</td>
                    <td class="px-4">${data.REQ_ID}</td>
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
                    <td class="text-right py-3 font-bold">문자전송여부</td>
                    <td class="px-4"><span class="px-3 ">${data.SEND_YN}</span> 
                       <a href="/admin/msgReSend?id=${cryptoLib.cipher('reqid',data.REQ_ID)}" class="bg-transparent hover:bg-gray-600 text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded mr-2 text-xs">재발송</a>
                    </td>
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
                   <input type="submit" value="확인" name="submit" class="shadow-md font-medium ml-4 py-2 px-4 text-green-100 cursor-pointer bg-blue-600 rounded text-lg tr-mt svelte-jqwywd">
                </p>
  

              </form>
             </section>
      `;
}