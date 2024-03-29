﻿var tuluId = $("#TuluHiddenId").val();
var defaultBio = "default Bio";
var gUser = "";

function TuluDashboardSummary() {
    $.ajax({
        type: "PUT",
        url: "/Tulu/DashboardSummary",
        //data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
            // TuluList(results.id)
            populateDashboard(results)
        },
        error: function (results) {
            alert("Error");
        },
    });
}

function GetCurrentUser() {
    //FIXME: I think this needs to be deleted
    $.ajax({
        type: "PUT",
        url: "/Users/Current",
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
            // gUser = results;
            // gUser.bio = defaultBio;
            populatePage(results);
            // SaveUser();
        },
        error: function (results) {
            alert("Error");
        },
    });
}

function populatePage(userInfo){
    $('.userName').append(userInfo.firstName +" "+userInfo.lastName);
    $('.userRole').append(userInfo.roles[0].role);
    $('.userBio').append(userInfo.bio);

    var html = "";
    html+='<li>';
    html+='    <a href="'+userInfo.facebook+'" target="_blank">';
    html+='        <i class="fab fa-facebook fa-2x"></i>';
    html+='    </a>';
    html+='</li>';
    html+='<li>';
    html+='    <a href="'+userInfo.instagram+'" target="_blank">';
    html+='        <i class="fab fa-instagram fa-2x"></i>';
    html+='    </a>';
    html+='</li>';
    html+='<li>';
    html+='    <a href="'+userInfo.linkedin+'" target="_blank">';
    html+='        <i class="fab fa-linkedin-in fa-2x"></i>';
    html+='    </a>';
    html+='</li>';
    $('.socialMediaAccounts').append(html);

    // $('.subInfo .experience').append(userInfo.experience);
    // $('.subInfo .specialty').append(userInfo.specialty);
    // $('.subInfo .favouriteCar').append(userInfo.favouriteVehicle);
    // $('.subInfo .currentCar').append(userInfo.currentVehicle);
    // $('.subInfo .location').append(userInfo.address.street +' '+userInfo.address.city+' '+userInfo.address.province+' '+userInfo.address.postal);
}

function TuluList() {
    $.ajax({
        type: "PUT",
        url: "/Tulu/ListContacts",
        //data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
            // populateClientList(results);
        },
        error: function (results) {
            alert("Error");
        },
    });
}

function ClientList() {
    $.ajax({
        type: "PUT",
        url: "/Tulu/ListContacts",
        //data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
            populateClientList(results);
        },
        error: function (results) {
            alert("Error");
        },
    });
}

function TestUserList() {
    //FIXME: I think this needs to be deleted
    $.ajax({
        type: "PUT",
        url: "/Users/List",
        //data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
        },
        error: function (results) {
            alert("Error");
        },
    });
}

//malik fix tulu list 
function TestTuluList() {
    //FIXME: I think this needs to be deleted
    $.ajax({
        type: "PUT",
        url: "/Users/TestListAllTulus",
        //data: obj,
        cache: false,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (results) {
            console.log(results);
        },
        error: function (results) {
            alert("Error");
        },
    });
}

function populateDashboard(info) {
    $('#messageCount').append(info.unReadMessages);
    $('#appointmentCount').append(info.newTestDrives);

    $('#messageCountCard').append("("+info.unReadMessages+")");
    $('#appointmentCountCard').append("(" + info.newTestDrives + ")");

}





