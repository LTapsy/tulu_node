
  LoadTulus(tuluList)
  LoadBlog(blog)
  LoadDealer(blog)

  function LoadTulus(tulu) {
	var html = '';
	for (i = 0; i != 4; i++) {
      if(tuluList[i].status="active"){
        html+='<li class="influencerListItems">';
        html+='  <div class="influencerImage">';
        html+='    <a href="/tulu/viewTulu?tuluId='+tuluList[i]._id+'">';
        html+='      <img src="/image/'+tuluList[i]._id+'" >';
        html+='    </a>';
        html+='  </div>';
        html+='  <h3 class="influencerName">'+tuluList[i].fName +" "+tuluList[i].lName+'</h3>';
        html+='  <div class="userRating">';

        if(tulu[i].ratings == 5){
          for(x=0;x!=5;x++){
            html = html + '		    <i class="fas fa-star"></i>';
          }
        }else if(tulu[i].ratings == 4){
          for(x=0;x!=4;x++){
            html = html + '		    <i class="fas fa-star"></i>';
          }
          html = html + '		    <i class="far fa-star"></i>';
        }else if(tulu[i].ratings == 3){
          for(x=0;x!=3;x++){
            html = html + '		    <i class="fas fa-star"></i>';
          }
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
        }else if(tulu[i].ratings == 2){
          for(x=0;x!=2;x++){
            html = html + '		    <i class="fas fa-star"></i>';
          }
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
        }else if(tulu[i].ratings == 1){
          html = html + '		    <i class="fas fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
        }else{
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
          html = html + '		    <i class="far fa-star"></i>';
        }

        html+='  </div>';
        html+='</li>';
      }
  }
	$(".influencerList").empty();
	$(".influencerList").append(html);
}


function LoadBlog(){
  var html='';
  for(var x=0;x!=blog.length;x++){
      html+='<li>';
      html+='<img src="/image/'+blog[x]._id+'">'
      // html+='<p class="tag">'+blogList[x].tag+'<span>'+blogList[x].date+'</span></p>';
      html+='<p class="tag"><span>'+blog[x].date+'</span></p>';
      html+='<h2 class="title">'+blog[x].blogName+'</h2>';
      html+='<p class="description">'+blog[x].description+'</p>';
      html+='<a href="/Blog/'+blog[x]._id+'">Read this Story<i class="fas fa-arrow-right"></i></a>';
      
      html+='</li>';
  }
  $('.blogSection ul').empty();
  $('.blogSection ul').append(html);
  document.querySelectorAll('.description').innerText = truncateText('.description', 107);
}


function truncateText(selector, maxLength) {
    var element = document.querySelector(selector),
        truncated = element.innerText;

    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + '...';
    }
    return truncated;
}

var reviewCount=1;
function backReview(){
  if(reviewCount==1){
    reviewCount =3;
    document.querySelector('#reviewOne').style="display:none;";
    document.querySelector('#reviewTwo').style="display:flex;";
  }else if(reviewCount==2){
    reviewCount--;
    document.querySelector('#reviewOne').style="display:flex;";
    document.querySelector('#reviewTwo').style="display:none;";
  }
  else if(reviewCount==3){
    reviewCount--;
    document.querySelector('#reviewTwo').style="display:flex;";
    document.querySelector('#reviewThree').style="display:none;";
  }
}

function nextReview(){
  if(reviewCount==1){
    reviewCount =2;
    document.querySelector('#reviewOne').style="display:none;";
    document.querySelector('#reviewTwo').style="display:flex;";
  }else if(reviewCount==2){
    reviewCount=3;
    document.querySelector('#reviewThree').style="display:flex;";
    document.querySelector('#reviewTwo').style="display:none;";
  }else if(reviewCount==3){
    reviewCount=1;
    document.querySelector('#reviewOne').style="display:flex;";
    document.querySelector('#reviewThree').style="display:none;";
  }
}


function LoadDealer(){
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  var html="";
  for(var i=0;i!=dealershipList.length;i++){
    html+='<li class="item '+alphabet[i]+'">';
    for(var x=0;x!=dealer.length;x++){
      if(dealer[x].uuid==dealershipList[i].dealerId){
        html+='<a href="/DealerListing/'+dealer[x].uuid+'">';
        html+='<img src="image/'+dealershipList[i]._id+'">';
        html+='</a>';
      }
    }
    html+='</li>';
  }

  $(".carousel").empty();
	$(".carousel").append(html);
}


var carousel = $(".carousel"),
    currdeg  = 0;

$(".next").on("click", { d: "n" }, rotate);
$(".prev").on("click", { d: "p" }, rotate);

function rotate(e){
  if(e.data.d=="n"){
    currdeg = currdeg - 60;
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 60;
  }
  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
}

setInterval(function(){ 
  document.querySelector(".next").click();
 }, 3000);