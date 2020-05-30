const BLOG_URL = "http://blog.naver.com/h0661h";

module.exports = {
	html:function(){ 

		return  topSection()
				+ ceoSection()
				+ techSection()
				+ equipSection()
				+ endSection();
	}
}

function topSection(){
	return `
		<section class="top_section">
			<div style="font-family: 'Do Hyeon', Sans-serif;" class="h-48 py-20 text-3xl text-center bg-cover bg-blue-100" >회사 소개</div>
		</section>	
		`;
}


function ceoSection(){
	return `
	<section style="order:5;" class="w-full pt-10 px-10 ceo_section text-center"> 
		<img class="pt-8 inline-block" src="images/s_images/ceo.png">
        <h2 class="text-2xl font-midium text-center py-6">CEO</h2>
        <div class="flex justify-center">
            <div class="text-center max-w-2xl">
                <div class="text-xl font-normal leading-normal mt-4">안녕하십니까?<br>한국건축설비누수 허재균입니다.<br>저희 홈페이지를 찾아주셔서 감사합니다.</div>
                <div class="text-xl font-normal leading-normal mt-4" style="color: #666666;">20여년의 실무경험과 기술을 바탕으로 누수탐지 업계의 선두업체로 성실 시공과 책임있는 하자 보수로 고객 여러분께 꼼꼼한 누수공사 약속 드리겠습니다</div>
            </div>
        </div>
  </section>
`;
}

function techSection(){
	return `<section style="order:5; " class="w-full pt-10 px-4 text-center tech_section">
				<img class="pt-8 inline-block" src="images/s_images/tech.png">
				<h2 class="text-2xl font-midium text-center py-6">기술자격현황</h2>
				<img class="inline-block px-4 py-2" src="images/p_images/tech_사업자등록증.jpg" >
				<div class="text-center">
					<img class="inline-block px-4 py-2" src="images/p_images/tech_난방시공업.jpg" >
					<img class="inline-block px-4 py-2" src="images/p_images/tech_가스시설시공업.jpg" >
					<img class="inline-block px-4 py-2" src="images/p_images/tech_가스시설시공업_자격증.jpg" >
					<img class="inline-block px-4 py-2" src="images/p_images/tech_난방시공업_자격증.jpg" >
					<img class="inline-block px-4 py-2" src="images/p_images/tech_가스산업기사.jpg" >
					<img class="inline-block px-4 py-2" src="images/p_images/tech_건축설비산업기사.jpg" >
				</div>
			</section>`;
}

function equipSection(){
	return `<section style="order:5;" class="w-full pt-10 px-4 text-center equip_section">
				<img class="pt-8 inline-block" src="images/s_images/equip.png">
				<h2 class="text-2xl font-midium text-center py-6">보유장비</h2>
				<div class="equip_div text-center pt-4">
					<div><img src="images/p_images/equip_청음탐지기.jpg"><div class="px-10"><p>청음탐지기</p><span>누수음을 듣는 장비</span></div></div>	
					<div><img src="images/p_images/equip_가스탐지기.jpg"><div class="px-10"><p>가스탐지기</p><span>가스냄새를 맡아 어디지점에서 누수가 되는지 확인하는 장비</span></div></div>
					<div><img src="images/p_images/equip_압력계.jpg"><div class="px-10"><p>압력계</p><span>배관과 콤프레샤 또는 가스탐지 장비에 연결해서 누수가되는지 확인하는 압력계</span></div></div>
					<div><img src="images/p_images/equip_내시경.jpg"><div class="px-10"><p>내시경</p><span>눈으로 확인이 잘되지 않고 손이 들어가지 않는 곳을 확인하는 장비</span></div></div>
					<div><img src="images/p_images/equip_관로탐지기.jpg"><div class="px-10"><p>금속관로탐지기</p><span>집안에 (동관.철)배관이 어디로 연결되고 어디로 이어지는지 확인하는 장비</span></div></div>
					<div><img src="images/p_images/equip_비금속관로탐지기.jpg"><div class="px-10"><p>비금속관로탐지기</p><span>배관속에 삽입해서 어디로 지나가는지 확인하는 장비</span></div></div>
					<div>
						<img src="images/p_images/equip_스팀해빙기_01.jpg">
						<img src="images/p_images/equip_스팀해빙기_02.jpg">
						<div class="px-10"><p>스팀해빙기</p><span>배관이 얼었을때 배관내에 호스를 넣고 해빙하는 장비</span></div>
					</div>
					<div>
						<!--<img src="images/p_images/equip_석션기_01.jpg">-->
						<img src="images/p_images/equip_석션기_02.jpg">
						<div class="px-10"><p>석션기</p><span>보수 공사시 먼지나 이물질을 흡입하는 기능</span></div>
					</div>
					<div><img src="images/p_images/equip_콤프레샤.jpg"><div class="px-10"><p>콤프레샤</p><span>누수탐지 할때 기본필수 공기압으로 확인하는장비</span></div></div>
					<div><img src="images/p_images/equip_열화상카메라.jpg"><div class="px-10"><p>열화상카메라</p><span>뜨거운 곳이나 차가운곳을 확인하고 누수탐지 및 난방배관 보수작업시 사용하는 보조장비</span></div></div>
				</div>
			</section>`;    
}
	
function endSection(){
	return `<section style="order:6;" class="w-full h-16" >
			</section>`;
}
	