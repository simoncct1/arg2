document.querySelector(".contact").addEventListener('mouseover', scrollToBottom);
function scrollToBottom(){
    document.documentElement.style.height= "110vh"
    window.scrollTo({ top: 100, behavior: 'smooth' });      
}       
document.querySelector(".plan").addEventListener('mouseover', scrollToBottom);
function scrollToBottom(){
    document.documentElement.style.height= "110vh"
    window.scrollTo({ top: 100, behavior: 'smooth' });      
}       
document.querySelector(".contact").addEventListener('mouseout', scrollToTop);
function scrollToTop(){
    document.documentElement.style.height= "100vh"
    window.scrollTo({ top: 0, behavior: 'smooth' });      
}       
document.querySelector(".plan").addEventListener('mouseout', scrollToTop);
function scrollToTop(){
    document.documentElement.style.height= "100vh"
    window.scrollTo({ top: 0, behavior: 'smooth' });      
}       


//machine
var step = 0;
if(step == 0){
    document.querySelector(".plan").classList.add("blurred"); 
    document.querySelector(".dbs").classList.add("blurred"); 
    document.querySelector(".budg").classList.add("blurred"); 
    document.querySelector(".fiches").classList.add("blurred"); 
    document.querySelector(".plan").removeEventListener('mouseover', scrollToBottom);
    document.querySelector(".plan").removeEventListener('mouseout', scrollToTop);
}

//mise en page et anim des divs
var x;
function getCards(){
 x = document.querySelectorAll(".flex:not(.blurred)");
}
getCards();
for(i=0;i<x.length; i++){
    x[i].addEventListener('click',function (e) {
        this.classList.add("active");
        this.style = "z-index:11";
         var selected = this;
         document.querySelector(".plan").removeEventListener('mouseout', scrollToTop);
         document.querySelector(".contact").removeEventListener('mouseout', scrollToTop);
        document.querySelector("#blocker").style = "z-index:10; opacity: 10%; display: block;";
        document.querySelector("#blocker").addEventListener('click', function(){
            selected.classList.remove("active"); 
            document.querySelector("#blocker").style = "z-index:-1; display: none";
            selected.style = "z-index:0";
                window.scrollTo({ top: 0, behavior: 'smooth' });      
                document.querySelector(".plan").addEventListener('mouseout', scrollToTop);
                document.querySelector(".contact").addEventListener('mouseout', scrollToTop);
        })
       }) 
}

//interface
document.querySelector(".logo").addEventListener('click',function (e) {
    console.log("cc");
    console.log(this);
    this.classList.toggle('ok');
    blocker = document.querySelector("#blocker");
    blocker.style = "z-index:1; opacity: 10%; display: block;";
    blocker.addEventListener('click', function (e){
        document.querySelector(".logo").classList.remove('ok');
    document.querySelector("#blocker").style = "z-index:-1; display: none";
    })
    }) 
  
