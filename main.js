document.querySelector(".contact").addEventListener('mouseover', scrollToBottom);    
document.querySelector(".plan").addEventListener('mouseover', scrollToBottom);
function scrollToBottom(){
    document.documentElement.style.height= "110vh"
    window.scrollTo({ top: 100, behavior: 'smooth' });      
}       
document.querySelector(".contact").addEventListener('mouseout', scrollToTop);  
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
var i;
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

//alerts

document.getElementById('budg').addEventListener("click", validatePassMS);
document.getElementById('plan').addEventListener("click", validatePassMS);
document.getElementById('fiches').addEventListener("click", validatePassMS);
function validatePassMS(){
    
SoloAlert.prompt({
    // dialog title
    title: "Entrez le mot de passe",
    // dialog content
    body: "",
    // input type
    type: "password",
    // max number of characters
    textLimit: 15,
    // or "light", "dark"
    theme: "light",
    // additional HTML content
    html: "",
    useTransparency: true
}).then(value => {
       var password= 1234;
            if (value == password) {
   window.location.replace(
    "miska.html"
  )      
    }
    else 
    {
        SoloAlert.alert({
            title:"Mauvais mot de passe",
            body:"Veuillez ré-essayer",
            theme: "light",
            useTransparency: true,
          })
    
    }
})}
  
document.getElementById('DB').addEventListener("click", validatePassDB);
function validatePassDB(){
    
SoloAlert.prompt({
    // dialog title
    title: "Entrez le mot de passe",
    // dialog content
    body: "",
    // input type
    type: "password",
    // max number of characters
    textLimit: 8,
    // or "light", "dark"
    theme: "light",
    // additional HTML content
    html: "",
    useTransparency: true
}).then(value => {
       var password= 1234;
            if (value == password) {
                SoloAlert.prompt({
                    // dialog title
                    title: "Félicitations",
                    // dialog content
                    body: "Veuillez encoder votre addresse mail",
                    // input type
                    type: "email",
        
                    theme: "light",
                    // additional HTML content
                    html: "",
                    useTransparency: true
                }).then(value => {
                 
                      
                      
                    //   function createCookie(name, value, days) {
                    //     var expires;
                    //     if (days) {
                    //       var date = new Date();
                    //       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    //       expires = "; expires=" + date.toGMTString();
                    //     }
                    //     else {
                    //       expires = "";
                    //     }
                    //     document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";      
                   window.location.replace(
                    "mail.php"
                  )      
                  
              
                })}
})}
  