const BLOG_URL = "http://blog.naver.com/h0661h";

module.exports = {
	html:function(){

		return  topSection()
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
        <h2 class="text-2xl font-midium text-center py-8">CEO</h2>
        <div class="flex justify-center">
            <div class="text-center max-w-2xl">
                <div class="text-xl font-normal mt-4">안녕하십니까?<br>한국건축설비누수 허재균입니다.<br>저희 홈페이지를 찾아주셔서 감사합니다.</div>
                <div class="text-xl font-normal mt-4" style="color: #666666;">20여년의 실무경험과 기술을 바탕으로 누수탐지 업계의 선두업체로 성실 시공과 책임있는 하자 보수로 고객 여러분께 꼼꼼한 누수공사 약속 드리겠습니다</div>
            </div>
        </div>
  </section>
`;
}

function techSection(){
	return `<section style="order:5; " class="w-full pt-10 px-4  tech_section">
				<h2 class="text-2xl font-midium text-center py-8">기술자격현황</h2>
				<div class="text-center">
					<img class="inline-block px-4" src="images/p_images/tech_01.jpg" >
					<img class="inline-block px-4" src="images/p_images/tech_02.jpg" >
				</div>
			</section>`;
}

function equipSection(){
	return `<section style="order:5;" class="w-full pt-10 px-4  equip_section">
				<h2 class="text-2xl font-midium text-center py-8">보유장비</h2>
				<div class="equip_div text-center">
					<div><p>누수탐지기</p><img src="images/p_images/equip_nusu.jpg"></div>
					<div><p>가스탐지기</p><img src="images/p_images/equip_gas.jpg"></div>
					<div><p>콤프레샤</p><img src="images/p_images/equip_comp.jpg"></div>
					<div><p>해빙기</p><img src="images/p_images/equip_ice.jpg"></div>
					<div><p>카드단말기</p><img src="images/p_images/equip_card.jpg"></div>
				</div>
			</section>`;
}
	
function endSection(){
	return `<section style="order:6;" class="w-full h-16" >
			</section>`;
}
	