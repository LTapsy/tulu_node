
    window.onload = function () {
        var hash;
        var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split("=");
            if (hash[0] === "tuluId") {
                tuluId = hash[1];
            }
        }
        populateTulu();
    }

    function populateTulu(){
        for(var x = 0;x!=tuluList.length; x++){
            if(tuluList[x]._id == tuluId){
                // console.log(tuluList[x]);
                $('.userName').append(tuluList[x].fName +' '+tuluList[x].lName);
                $('.userRole').append(tuluList[x].role);
                $('.userBio').append(tuluList[x].bio);
                var userImage = '<img src="/image/'+ tuluList[x]._id +'">'
                $('.userImage').empty();
                $('.userImage').append(userImage);


                var html = "";
                html+='<li>';
                html+='    <a href="'+tuluList[x].facebook+'" target="_blank">';
                html+='        <i class="fab fa-facebook fa-2x"></i>';
                html+='    </a>';
                html+='</li>';
                html+='<li>';
                html+='    <a href="'+tuluList[x].instagram+'" target="_blank">';
                html+='        <i class="fab fa-instagram fa-2x"></i>';
                html+='    </a>';
                html+='</li>';
                html+='<li>';
                html+='    <a href="'+tuluList[x].linkedin+'" target="_blank">';
                html+='        <i class="fab fa-linkedin-in fa-2x"></i>';
                html+='    </a>';
                html+='</li>';
                $('.socialMediaAccounts').append(html);

                $('.experience').append(tuluList[x].experience);
                $('.specialty').append(tuluList[x].specialty);
                $('.favouriteCar').append(tuluList[x].favoriteCar);
                $('.currentCar').append(tuluList[x].currentCar);

                // var emailBtn = "";
                // emailBtn+='<a href = "mailto: '+tuluList[x].email+'" target="_blank">';
                // emailBtn+='    <button class="sendMessage" onclick="sendTuluMessage()">Send Message</button>';
                // emailBtn+='</a>';

                
                // $('.wrapper').append(emailBtn);

                // var messengerBtn = "";
                // messengerBtn+='<button onclick="goToMessenger()" class="sendMessage">';
                // messengerBtn+='Send Message';
                // messengerBtn+='</button>';
                // messengerBtn+='';
 
                // $('.wrapper').append(messengerBtn);
            }
        }
    };

    function sendTuluMessage(){
        // window.location = "/MessageTulu/" + tuluId;
    }

    function goToMessenger(){
        window.location = "/messenger/?recipientId="+tuluId;
    }