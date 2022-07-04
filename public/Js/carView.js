
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}    
    
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "flex";  
    dots[slideIndex-1].className += " active";
}


// var html="";
// html+='<h3 class="userName" id="dealershipName" onclick="viewDealer(`'+dealers[0].uuid+'`)">';
// html+=    dealers[0].name;
// html+='</h3>';
// html+='<p>'+dealers[0].website+'</p>';
// html+='<p>'+address[0].street+" "+address[0].city+", "+address[0].province+'</p>';
// html+='<p>'+dealers[0].amvic+'</p>';
// html+='<p></p>';
// $('.userInfo').append(html)


$('#vinNumber').val(vin);
$('#dealershipName').val(dealers[0].name);
$('#year').val(vehicles[0].year);
$('#make').val(vehicles[0].make);
$('#model').val(vehicles[0].model);

// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
//  if(dd<10){
//         dd='0'+dd
//     } 
//     if(mm<10){
//         mm='0'+mm
//     } 

// today = yyyy+'-'+mm+'-'+dd;
// console.log(today)
// document.getElementById("dateTestDrive").setAttribute("min", today);


function viewDealer(dealerId){
    location.replace("/DealerListing/"+dealerId);
}


function buyNow(){
    location.replace("/BuyNow/"+vin);
}

function bookAppointment(){
    location.replace("/appointment/booking/"+vin);
}

function fullScreen(){
    document.querySelector('.slideshow-container').style ="position:fixed;width:100vw;height:100vh;background:#00000050;top:0;right:0;justify-content: center;align-items: center;z-index: 9999;padding:150px 0;margin:0;"

    document.querySelector('.next').style = " right: 150px;border-radius: 3px 0 0 3px;"
    document.querySelector('.prev').style = " left: 150px;border-radius: 3px 0 0 3px;"
}


function financeThis(){
    document.querySelector('.financePopUp').style="display:flex !important;";
    console.log('test')
}

function cancelFinance(){
    document.querySelector('.financePopUp').style="display:none;";
}

function cancelTestDrive(){
    document.querySelector('.testDrivePopUp').style="display:none;";
}


function gallery(){
    document.querySelector('.gallery').style="position:fixed;top:0;height:100vh;width:100vw;left:0;justify-content:center;align-items:center;background:black;";
    document.querySelector('#closeGallery').style="display: flex;";
    document.querySelector('.slideshow-container').style="align-items: center;";
    var x = window.matchMedia("(max-width: 600px)")
    if (x.matches) { // If media query matches
        document.querySelector('.next').style="top:unset;bottom:50px !important;right:150px;transition:unset;";
        document.querySelector('.prev').style="top:unset;bottom:50px !important;left:150px;";
    } else {
        document.querySelector('.next').style="right:150px;transition:unset;";
        document.querySelector('.prev').style="left:150px;";
    }
}

function closeGallery(){
    document.querySelector('.gallery').style="";    
    document.querySelector('#closeGallery').style="";
    document.querySelector('.slideshow-container').style="";
    document.querySelector('.next').style="";
    document.querySelector('.prev').style="";
}


function testDrive(){
    location.replace("/TestDrive/"+vehicles[0].vin);
}


function FinanceThankYou(){
    document.querySelector('.finance').style="display:none;"   
    document.querySelector('.financeThankYou').style="display:flex;"
}



function verifyFinance(){
    const vinNumber = document.querySelector('#vinNumber').value;
    const dealershipName = document.querySelector('#dealershipName').value;
    const year = document.querySelector('#year').value;
    const make = document.querySelector('#make').value;
    const model = document.querySelector('#model').value;
    const fname = document.querySelector('#fname').value;
    const lname = document.querySelector('#lname').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const email = document.querySelector('#email').value;
    const when = document.querySelector('#when').value;

    if(vinNumber!="" ||dealershipName!="" || year!="" || make!="" || model!="" || fname!="" || lname!="" || phoneNumber!="" || email!="" || when!=""){   
        document.querySelector('.financeSubmit').disabled = false;
        document.querySelector('.financeSubmit').style = 'opacity:1';
    }
}

