//메뉴 토글 버튼
function fn_menuToggle(){
    const gnb = document.querySelector(".gnb"); //메뉴 
    if( gnb.style.display == "block"){
       gnb.style.display = "none";
    }else{
      gnb.style.display = "block";
    }
}

function init(){

     //메뉴버튼 
     document.querySelector(".menu_toggle_btn").addEventListener("click", () => {
        const gnb = document.querySelector(".gnb"); //메뉴 
       if( gnb.style.display == "block"){
          gnb.style.display = "none";
       }else{
         gnb.style.display = "block";
       }
    }); 
  
  /* 개인정보 수집 정책 */ 
    const btnPrivacyClose = document.getElementById('btnPrivacyClose');
    const btnPrivacyOpen  = document.getElementById('btnPrivacyOpen');
    const modal         = document.getElementById('privacyModal');
  
    const openPrivacy = () => {
      modal.classList.remove("hidden");
    }
    
    const closePrivacy = () => {
      modal.classList.add("hidden");
    }
  
    btnPrivacyOpen.addEventListener("click",openPrivacy);
    btnPrivacyClose.addEventListener("click",closePrivacy);
     
}


init();