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
     
}


init();