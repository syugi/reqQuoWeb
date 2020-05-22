module.exports = {
	
	html:function(){
		 return topSection() 
			 +formSection()
       +checkPrivacyModal();
	}
  ,result:function(){
		 return  resultSection();
	}
}
	
function topSection(){
	return `
		<section class="top_section">
			<div style="font-family: 'Do Hyeon', Sans-serif;" class="h-48 py-20 text-3xl text-center bg-cover bg-blue-100" >견적 문의</div>
			<div class="px-5 pt-10"> 아래의 양식을 작성하여 문의하시면 입력하신 휴대폰 번호로 견적 상담 문자/전화를 드립니다.</div>
			<div class="flex px-5 py-5"> 
				<img src="images/s_images/icon_call.png" style="width:30px; height:30px">
				<span class="px-2 self-center">전화 문의</span>
				<a class="self-center" href="tel:010-7504-1822"><span class="text-2xl font-semibold text-blue-600">010-7504-1822</span></a>
			</div>
		</section>	
		`;
}

function formSection(){
	return `
		<section class="form_section pb-10 px-3">
   			<form method="POST" onsubmit="return validate();" enctype="multipart/form-data" action="/reqQuote/save">  
				<!-- 기본정보 -->
				<div class="subTitle font-bold text-2xl">기본정보</div>
				<label class="block py-3">
					<span class="text-gray-70">이름</span><span class="text-blue-500 pl-1">*</span>
					<input class="form-input mt-1 block w-full" type="text" name="custNm" id="custNm" placeholder="이름을 입력해주세요">
				</label>
				<label class="block py-3">
					<span class="text-gray-700">휴대폰 번호</span><span class="text-blue-500 pl-1">*</span>
					<input class="form-input mt-1 block w-full" type="text" name="telNo" id="telNo" placeholder="숫자만 입력해주세요">
				</label>
				
				<!-- 상세정보 -->
				<div class="subTitle font-bold text-2xl">상세정보</div>
				<label class="block py-3">
					<span class="text-gray-700">업종</span>
					<select id="upjongSelect" class="form-select mt-1 block w-full" name="upjong" onchange="chageUpjongSelect()">
						<option>누수</option>
						<option>변기</option>
						<option>보일러</option>
						<option>기타</option>
					</select>
				</label>

				<div class="py-3" id="boilerTypeDiv" style ="display:none">
					<span class="text-gray-700">보일러 구분</span>
					<div class="mt-2">
					  <label class="inline-flex items-center">
						<input type="radio" class="form-radio" name="boilerType" value="개별난방">
						<span class="ml-2">개별난방</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="boilerType" value="지역난방">
						<span class="ml-2">지역난방</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="boilerType" value="기타">
						<span class="ml-2">기타</span>
					  </label>
					</div>
				</div>

				<div class="py-3">
					<div class="py-2 text-blue-500 font-semibold">* 일정에 따라 인천/경기 이외 지역은 시공이 불가능 할 수 있습니다. </div>
					<input class="form-input mb-2" type="text" id="sample3_postcode" name="postCode"  placeholder="우편번호">
					<input type="button" class="mb-2 py-3 px-4 rounded border font-semibold border-blue-600 text-blue-600"   onclick="sample3_execDaumPostcode()" value="우편번호 찾기"><br>
					<input type="text" class="mb-2 form-input  w-full" id="sample3_address" name="addr" placeholder="주소"><br>
					<input type="text" class="mb-2 form-input  w-full" id="sample3_detailAddress" name="dtlAddr" placeholder="(선택) 상세주소 입력">
					<input type="text" class="mb-2 form-input hidden" id="sample3_extraAddress" name="extAddr" placeholder="참고항목">

					<div id="post_wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
					  <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
					</div>
				</div>

				<label class="block py-3">
					<span class="text-gray-700 py-3">상세내용</span>
					<textarea class="form-textarea mt-1 block w-full" rows="3" name="descr" placeholder="상세 내용을 입력해주세요."></textarea>
				 </label>

				 <label class="block py-3">
					<span class="text-gray-700 py-3">첨부파일(현장사진)</span>
 					<input class="block py-2" type="file" name="img_file" accept="image/*" multiple>
				 </label>


				<!-- 부가정보 -->
			 	<div class="subTitle font-bold text-2xl">부가정보</div>

				<div class="py-3">
					<span class="text-gray-700">견적요청자</span>
					<div class="mt-2">
					  <label class="inline-flex items-center">
						<input type="radio" class="form-radio" name="custType" value="주인">
						<span class="ml-2">주인</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="custType" value="세입자">
						<span class="ml-2">세입자</span>
					  </label>
					</div>
				</div>
				
				<div class="block pt-10">
					<div class="mt-2">
						<label class="inline-flex items-center">
						  <input type="checkbox" name="privacyAgree" class="form-checkbox">
						  <span class="ml-2 cursor-pointer" id="btnModalOpen">개인정보수집 및 이용에 동의</span>
						</label>
					</div>
				</div>

				<p class="pt-5 pb-10 text-center">
					 <input type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded w-full" value="견적 문의 하기" name="submit">
				</p>
			</form>

		</section>
    `;
}

function resultSection(){
	return `
<section style="order:3; width:100%;">
  <div class="flex bg-gray-100 py-24 justify-center">
      <div class="p-12 text-center max-w-2xl">
          <div class="md:text-3xl text-3xl font-bold">견적요청이 완료되었습니다.</div>
          <div class="text-xl font-normal mt-4">견적요청 내용을 확인 후 입력하신 휴대폰 번호로 견적 상담 문자/전화를 드립니다.
        </div>
          <div class="mt-6 flex justify-center h-12 relative">
              <div class="flex shadow-md font-medium absolute py-2 px-4 text-green-100
          cursor-pointer bg-blue-600 rounded text-lg tr-mt  svelte-jqwywd" id="btnModalClose">확인</div>
          </div>
      </div>
  </div>
</section>
  `;
}

function checkPrivacyModal(){
  return `
  <div class="modal hidden" id="checkPrivacyModal"> 
    <div class="md:w-2/3 sm:w-full rounded-lg shadow-lg bg-white my-3 modal-content">
        <div class="flex border-b border-gray-100 px-5 pt-3">
              <span class="font-bold text-lg py-2">개인정보 수집 및 이용에 대한 안내</span>
        </div>

        <div class="px-5 py-2 text-gray-600">
            
            <p class="py-5 leading-normal">한국건축설비누수(이하 ‘회사’)는 견적을 신청하시는 분께 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령에 따라 개인정보의 수집·이용 목적, 수집하려는 개인정보의 항목, 개인정보의 보유 및 이용 기간에 대하여 안내드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
            </p>

            <h2 class="font-bold text-gray-700 text-lg py-5">1. 개인정보의 수집·이용 목적</h2>
            <p class="py-2 leading-normal">이용자 견적 의사 확인, 이용자 본인 식별·인증, 상담 및 방문견적 등 각종 서비스 제공을 위한 정보 제공,  약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영, 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재, 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축 등
            </p>


            <h2 class="font-bold text-gray-700 text-lg py-5">2. 수집하려는 개인정보의 항목</h2>
            <p class="py-2 leading-normal"><견적문의><br>
            - 필수항목 : 휴대전화번호, 이름<br>
            - 선택항목 : 이메일, 자택주소
            </p>

            <h2 class="font-bold text-gray-700 text-lg py-5">3. 개인정보의 보유 및 이용 기간</h2>
            <p class="py-2 leading-normal">원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보전할 필요가 있는 경우 일정 기간 동안 개인정보를 보관할 수 있습니다.
            </p>
        </div>

        <div class="px-5 py-4 flex justify-end">
          <button id="btnModalClose" class="text-sm py-2 px-3 text-gray-500 hover:text-gray-600 transition duration-150">확인</button>
        </div>
    </div>
  </div>
`;
}



	
	