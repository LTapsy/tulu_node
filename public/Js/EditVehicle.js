var id= "";
window.onload = function () {
    var hash;
    var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        if (hash[0] === "id") {
            id = hash[1];
        } 
    }
    console.log(id);
    // populateVehicle();
    GetVehicles();
}

function GetVehicles(){
    for(x=0;x!=vehicleList.length;x++){
        if(id == vehicleList[x]._id){
            console.log(vehicleList[x])
            populateVehicle(x);
        }
    }
}

function populateVehicle(index){
    $('#vin').val(vehicleList[index].vin);
    $('#year').val(vehicleList[index].year);
    $('#make').val(vehicleList[index].make);
    $('#model').val(vehicleList[index].model);
    $('#vehicleType').val(vehicleList[index].vehicleType);
    $('#trim').val(vehicleList[index].trim);
    // $('#dealerId').val(vehicleList[id].);
    // $('#isSold').val(vehicleList[id].);
    $('#doors').val(vehicleList[index].doors);
    $('#mileage').val(vehicleList[index].mileage);
    $('#modelNumber').val(vehicleList[index].modelNumber);
    $('#driveType').val(vehicleList[index].driveType);
    $('#msrp').val(vehicleList[index].msrp);
    $('#minPrice').val(vehicleList[index].minPrice);
    $('#maxPrice').val(vehicleList[index].maxPrice);
    $('#refFee').val(vehicleList[index].refFee);
    $('#engineName').val(vehicleList[index].engineName);
    $('#engineBrand').val(vehicleList[index].engineBrand);
    $('#engineID').val(vehicleList[index].engineID);
    $('#fuelType').val(vehicleList[index].fuelType);
    $('#iceMaxHp').val(vehicleList[index].iceMaxHp);
    $('#iceMaxTorque').val(vehicleList[index].iceMaxTorque);
    // $('#maxPayLoad').val(vehicleList[id].);
    $('#transmissionName').val(vehicleList[index].transmissionName);
    $('#colorName').val(vehicleList[index].colorName);
    $('#colorHex').val(vehicleList[index].colorHex);
    $('#baseTowingCapacity').val(vehicleList[index].baseTowingCapacity);
    $('#grossWeight').val(vehicleList[index].grossWeight);
    $('#fuelTankCapacity').val(vehicleList[index].fuelTankCapacity);
}
