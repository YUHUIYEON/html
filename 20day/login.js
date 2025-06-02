const login=document.getElementsByClassName('login_btn');
// 변수선언 변수명=document에서 ClassName('login_btn')이라는걸 조작하겠다. 
const login_back=document.getElementsByClassName('login-back');
const login_page=document.getElementsByClassName('login-page');

login[0].addEventListener('click',function(){
    login_back[0].style.display='block';
    login_page[0].style.display='block';
});
login_back[0].addEventListener('click',function(){
    login_back[0].style.display='none';
    login_page[0].style.display='none';
});