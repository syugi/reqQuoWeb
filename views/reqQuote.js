module.exports = {
	
	html:function(){
		 return topSection() 
			 +formSection();
	}
}
	
function topSection(){
	return ``;
}

function formSection(){
	return `
		<section class="form_section">

      <form method="POST" onsubmit="return validate();" enctype="multipart/form-data" action="/reqQuote/save">  
				<!-- 기본정보 -->
				<div class="subTitle py-4 font-bold text-2xl">기본정보</div>
				<label class="block py-3">
					<span class="text-gray-70">이름</span><span class="text-blue-500 pl-1">*</span>
					<input class="form-input mt-1 block w-full" type="text" name="custNm" id="custNm" placeholder="이름을 입력해주세요">
				</label>
				<label class="block py-3">
					<span class="text-gray-700">휴대폰 번호</span><span class="text-blue-500 pl-1">*</span>
					<input class="form-input mt-1 block w-full" type="text" name="telNo" id="telNo" placeholder="숫자만 입력해주세요">
				</label>
				
				<!-- 상세정보 -->
        <div class="subTitle py-4 font-bold text-2xl">상세정보</div>
				<label class="block mt-4  py-2">
					<span class="text-gray-700">업종</span>
					<select id="upjongSelect" class="form-select mt-1 block w-full" name="upjong" onchange="chageUpjongSelect()">
					  <option>누수</option>
					  <option>변기</option>
					  <option>보일러</option>
					  <option>기타</option>
					</select>
				</label>

				<div class="mt-4 py-2" id="boilerTypeDiv" style ="display:none">
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

				<div class="mt-4 py-2">
					<div class="py-2 text-blue-500">* 일정에 따라 인천/경기 이외 지역은 시공이 불가능 할 수 있습니다. </div>
          <input class="form-input" type="text" id="sample3_postcode" name="postCode"  placeholder="우편번호">
          <input type="button" class="py-4 px-4"   onclick="sample3_execDaumPostcode()" value="우편번호 찾기"><br>
					<input type="text" class="form-input  w-full" id="sample3_address" name="addr" placeholder="주소"><br>
					<input type="text" class="form-input  w-full" id="sample3_detailAddress" name="dtlAddr" placeholder="(선택) 상세주소 입력">
					<input type="text" class="form-input hidden" id="sample3_extraAddress" name="extAddr" placeholder="참고항목">

					<div id="post_wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
					  <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
					</div>
				</div>

				<label class="block py-2">
					<span class="text-gray-700 py-3">상세내용</span>
					<textarea class="form-textarea mt-1 block w-full" rows="3" name="descr" placeholder="상세 내용을 입력해주세요."></textarea>
				 </label>

				 <label class="block py-2">
					<span class="text-gray-700 py-3">첨부파일(현장사진)</span>
          <input class="block" type="file" name="img_file" accept="image/*" multiple>
				 </label>


				<!-- 부가정보 -->
			 	<div class="subTitle py-4 font-bold text-2xl">부가정보</div>

				<div class="mt-4  py-2">
					<span class="text-gray-700">견적요청자</span>
					<div class="mt-2">
					  <label class="inline-flex items-center">
						<input type="radio" class="form-radio" name="custType" value="주인" checked>
						<span class="ml-2">주인</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="custType" value="세입자">
						<span class="ml-2">세입자</span>
					  </label>
					</div>
				</div>
				
				<div class="block py-2">
					<div class="mt-2">
						<label class="inline-flex items-center">
						  <input type="checkbox" name="privacyAgree" class="form-checkbox">
						  <span class="ml-2">개인정보수집 및 이용, 제 3자제공동의에 동의</span>
						</label>
					</div>
				</div>

				<p class="py-4">
					 <input type="submit"  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded" value="견적요청 보내기" name="submit">
				</p>
			</form>

		</section>
    `;
}
	
	