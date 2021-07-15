
function populateVehicle(vehicleList){
    var html = "";
    for (var i = 0; i != vehicleList.length; i++) {
        html += '<li class="vehicleListItems">';
        var text = '';
        html += '    <img src="' + text + '" class="carImage" alt="car-image">';
        html += '   <div class="carDetails">';
        html += '       <h2 class="carName">' + vehicleList[i].year + ' ' + vehicleList[i].make + ' ' + vehicleList[i].model + '</h2>';
        html += '       <p class="carPrice">$'+vehicleList[i].maxPrice + '</p>';
        html += '       <p class="carMileage">1234567890 Kms</p>';
        html += '       <div class="additionalCarInfo" id="vehicle' + i + '">';
        html += '           <p class="carTrim">' + vehicleList[i].trim + '</p>';
        html += '           <p class="carTransmission">' + vehicleList[i].transmissionName + '</p>';
        html += '       </div>';
        html += '       <div class="moreInfoContainer">';
        html += '               <button class="moreInfo" onclick="carView(' + i + ')">View Vehicle</button>';
        html += '       </div>';
        html += '   </div>';
        html += '</li>';
    }
    $("#Vehicles").empty();
    $("#Vehicles").append(html);
}

function smallView(){
    var html = "";
    for (var i = 0; i != vehicleList.length; i++) {
        html+='<li class="vehicleListItemsSmallView">';
        var text = '';
        html+='    <img src="' + text + '" class="carImage" alt="car-image"/>';
        html+='    <div class="carDetails">';
        html+='        <h2 class="carName">' + vehicleList[i].year + ' ' + vehicleList[i].make + ' ' + vehicleList[i].model + '</h2>';
        html+='        <p class="carPrice">$'+vehicleList[i].maxPrice + '</p>';
        html+='        <p class="carMileage">1234567890 Kms</p>';
        html+='        <button class="moreInfo" onclick="carView(' + i + ')">View Vehicle</button>';
        html+='    </div>';
        html+='</li>';
    }
    $("#Vehicles").empty();
    $("#Vehicles").append(html);
}

function bigView(){
    var html = "";
    for (var i = 0; i != vehicleList.length; i++) {
        html += '<li class="vehicleListItems">';
        var text = '';
        html += '    <img src="' + text + '" class="carImage" alt="car-image">';
        html += '   <div class="carDetails">';
        html += '       <h2 class="carName">' + vehicleList[i].year + ' ' + vehicleList[i].make + ' ' + vehicleList[i].model + '</h2>';
        html += '       <p class="carPrice">$'+vehicleList[i].maxPrice + '</p>';
        html += '       <p class="carMileage">1234567890 Kms</p>';
        html += '       <div class="additionalCarInfo" id="vehicle' + i + '">';
        html += '           <p class="carTrim">' + vehicleList[i].trim + '</p>';
        html += '           <p class="carTransmission">' + vehicleList[i].transmissionName + '</p>';
        html += '       </div>';
        html += '       <div class="moreInfoContainer">';
        html += '               <button class="moreInfo" onclick="carView(' + i + ')">View Vehicle</button>';
        html += '       </div>';
        html += '   </div>';
        html += '</li>';
    }
    $("#Vehicles").empty();
    $("#Vehicles").append(html);
}