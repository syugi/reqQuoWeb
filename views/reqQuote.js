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
			<form action="/reqQuote/send_process" method="post">
				<!-- 기본정보 -->
				<div class="subTitle">기본정보</div>
				<label class="block">
					<span class="text-gray-700">이름</span>
					<input class="form-input mt-1 block w-full" type="text" name="custName"  placeholder="">
				</label>
				<label class="block">
					<span class="text-gray-700">연락처</span>
					<input class="form-input mt-1 block w-full" type="text" name="telNo" placeholder="">
				</label>
				
				<!-- 상세정보 -->
         		<div class="subTitle">상세정보</div>
				<label class="block mt-4">
					<span class="text-gray-700">업종</span>
					<select class="form-select mt-1 block w-full" name="upjong">
					  <option >누수</option>
					  <option>변기</option>
					  <option>보일러</option>
					  <option>기타</option>
					</select>
				</label>

				<div class="mt-4">
					<span class="text-gray-700">보일러 구분</span>
					<div class="mt-2">
					  <label class="inline-flex items-center">
						<input type="radio" class="form-radio" name="boilerType" value="personal">
						<span class="ml-2">개별난방</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="boilerType" value="busines">
						<span class="ml-2">지역난방</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="boilerType" value="busines">
						<span class="ml-2">기타</span>
					  </label>
					</div>
				</div>

				<div class="mt-4">
					<div>* 일정에 따라 인천/경기 이외 지역은 시공이 불가능 할 수 있습니다. </div>
					<input type="text" id="sample3_postcode" placeholder="우편번호">
					<input type="button" onclick="sample3_execDaumPostcode()" value="우편번호 찾기"><br>
					<input type="text" id="sample3_address" placeholder="주소"><br>
					<input type="text" id="sample3_detailAddress" placeholder="상세주소">
					<input type="text" id="sample3_extraAddress" placeholder="참고항목">

					<div id="post_wrap" style="display:none;border:1px solid;width:500px;height:300px;margin:5px 0;position:relative">
					  <img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
					</div>
				</div>

				<label class="block">
					<span class="text-gray-700">상세내용</span>
					<textarea class="form-textarea mt-1 block w-full" rows="3" placeholder="상세 내용을 입력해주세요."></textarea>
				 </label>

				 <label class="block">
					<span class="text-gray-700">첨부파일(현장사진)</span>
				 </label>


				<!-- 부가정보 -->
			 	<div class="subTitle">부가정보</div>

				<div class="mt-4">
					<span class="text-gray-700">견적요청자</span>
					<div class="mt-2">
					  <label class="inline-flex items-center">
						<input type="radio" class="form-radio" name="accountType" value="personal">
						<span class="ml-2">주인</span>
					  </label>
					  <label class="inline-flex items-center ml-6">
						<input type="radio" class="form-radio" name="accountType" value="busines">
						<span class="ml-2">세입자</span>
					  </label>
					</div>
				</div>
				
				<div class="block">
					<div class="mt-2">
						<label class="inline-flex items-center">
						  <input type="checkbox" class="form-checkbox">
						  <span class="ml-2">개인정보수집 및 이용, 제 3자제공동의에 동의</span>
						</label>
					</div>
				</div>

				<p>
					<input type="submit">
				</p>
			</form>
		</section>
    `;
}
	
	