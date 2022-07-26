
var start = 0;
var limit = 15;
function initialLoad(type){
  $.ajax({
      url: "/inventory/"+type+"/" + start + "/" + limit,
      method: "GET",
      success: function(res){
        if(res.vehicles.length < 15){
          removeNextButton();
        }
        renderPosts(res);
      }
    });
}

function getNext(type){
  start = start + limit;
  $.ajax({
    url: "/inventory/"+type+"/" + start + "/" + limit,
    method: "GET",
    success: function(res){
      if(res.vehicles.length < 15){
        removeNextButton(res.vehicles.length);
      }
      renderPosts(res);
    }
  });
}

function filter(formData){
  start = 0;
  limit = 15;
  $("#Vehicles").empty();
  var formDataObject = Object.fromEntries(new FormData(formData))
  let iterations = Object.keys(formDataObject).length
  var link = ''
  for (const [key, value] of Object.entries(formDataObject)) {
    if (!--iterations){
      link += `${key}=${value}`
    }else{
      link += `${key}=${value}&`
    }
  }
  $.ajax({
    url: "/inventory/filter?"+link,
    method: "GET",
    success: function(res){
      renderPosts(res);
    }
  });

  return false;
}

function removeNextButton(length){
  $("#nextButtonHolder").empty();
  if(length > 1){
    $("#nextButtonHolder").append("<p>END OF RESULTS</p>")
  }else{
    $("#loading").remove()
    $("#nextButtonHolder").append("<p>NO RESULTS</p>")
  }
}

function noResult(){
  $("#nextButtonHolder").append("<p>NO RESULTS</p>")
}

// function getPrevious(){
//   start = start - limit;
//   $.ajax({
//     url: "/get-post/" + start + "/" + limit,
//     method: "GET",
//     success: function(response){
//       renderPosts(response);
//     }
//   });
// }

function getVehicleImages(vin){
	display_image = ''
	console.log(vin)
	
	for(var i=0; i < vehicleimages.length; i++){
		if(vehicleimages[i].vin == vin && vehicleimages[i].is_display_photo == true){
			display_image = vehicleimages[i].image;
		}
	}
	
	if (display_image == ''){
		display_image = '../images/noimageavailable.jpg'
	}

	console.log(display_image)
	return display_image;
}
console.log(vehicleimages)
var view
function renderPosts(results){
  console.log(results)
  if (results.vehicles.length > 0){
    
    var html = "";
    var vehicles = results.vehicles;
    console.log(vehicles)
    vehicles.forEach(function(data){
     
      var image = getVehicleImages(data.vin)
      data.transmissionName ? data.transmissionName = data.transmissionName : data.transmissionName = "n/a";
      data.mileage ? data.mileage = data.mileage : data.mileage = "n/a";
      data.trim ? data.trim = data.trim : data.trim = "n/a";
      var dealername
      if(data.dealer != undefined){
        dealername = data.dealer.name
      }else{
        dealername = "No Dealership"
      }
      if(view == 'small'){
          html+='<li class="vehicleListItemsSmallView" id="vehicleHolder">';
          var text = '';
          html+='<div class="imgContainer">';
          html+='    <img src="'+ image +' class="carImage" alt="car-image"/>';
          html+='</div>';
          html+='    <div class="carDetails">';
          html+='        <h2 class="carName">' + data.year + ' ' + data.make + ' ' + data.model + '</h2>';
          html+='        <p class="carPrice">$' + data.maxPrice + '</p>';
          if(data.mileage != null){
              html += '       <p class="carMileage">'+data.mileage +'  Kms</p>';
          }
          html+='        <a href="/carview/'+ data.vin +'"><button class="moreInfo">View Vehicle</button></a>';
          html += '       <p class="dealership">' + data.dealer.name + '</p>';
          html+='    </div>';
          html+='</li>';
      }else{
          html += '<li class="vehicleListItems" id="vehicleHolder">';
          html += '   <a href="/carview/'+ data.vin +'">';
          html += '      <div class="imgContainer">';
          html += '           <div class="views"><i class="far fa-eye"></i> '+data.views+' views</div>';
          html += '          <img src="'+ image +'" class="carImage" alt="car-image"/>';
          html += '      </div>';
          html += '      <div class="carDetails">';
          html += '          <h2 class="carName">' + data.year + ' ' + data.make + ' ' + data.model + '</h2>';
          html += '          <p class="carPrice">$'+data.maxPrice + '</p>';
          html += '          <div class="additionalCarInfo" id="vehicle' + i + '">';
          html += '              <div><p class="carMileage"><i class="fas fa-tachometer-alt"></i>&nbsp;&nbsp;'+data.mileage +'  Kms</p></div>';
          html += '              <div><p class="carTrim"><i class="fas fa-car-side"></i>&nbsp;&nbsp;' + data.vehicleType + '</p></div>';
          html += '              <div><p class="carTransmission"><img class="infoIcon" src="/images/icons/gearbox.png" alt="">&nbsp;&nbsp;' + data.transmission + '</p></div>';
          html += '          </div>';
          html += '          <p class="dealership">' + dealername + '</p>';
          html += '      </div>';
          html += '   </a>';
          html += '</li>';
      }
    })
    $("#loading").remove()
    $("#Vehicles").append(html)
  }else{
    $("#loading").remove()
  }
}





function carView(index){
    location.replace("/carview"+ "?id=" + index);
}


function selectedFilter(){
  var filterval = Object.fromEntries(new URLSearchParams(location.search))
  $('#MakeSearch').val(filterval.make)
  $('#VehicleTypeSearch').val(filterval.vehicleType)
  $('#dealerId').val(filterval.dealerId)
  $('#minPrice').val(filterval.minPrice)
  $('#maxPrice').val(filterval.maxPrice)
  console.log(filterval)
  if(filterval.VehicleSort == undefined){
      $('#VehicleSort').val("")
  }else{
      $('#VehicleSort').val(filterval.VehicleSort)
  }
  $('#sortedBy').text($("#VehicleSort option:selected").text())
  

  $('#makeSelect').val(filterval.make)
  $('#vehicleType').val(filterval.type)
  ////////////////////////////////////
  $('#MakeSearchMobile').val(filterval.make)
  $('#VehicleTypeSearchMobile').val(filterval.vehicleType)
  if(filterval.VehicleSort == undefined){
      $('#VehicleSortMobile').val("")
  }else{
      $('#VehicleSortMobile').val(filterval.VehicleSort)
  }
  
  $('#sortedBy').text($("#VehicleSortMobile option:selected").text())
  
  $('#makeSelectMobile').val(filterval.make)
  $('#vehicleTypeMobile').val(filterval.type)
}
selectedFilter()

function SearchVehicles(){
  var filterval = Object.fromEntries(new URLSearchParams(location.search))
  $('#modelSelect').empty();
  $('#yearSelect').empty();
  $.ajax({
    url: "/inventory/getModels?make=" + $('#makeSelect').val() + "&type="+ $('#VehicleTypeSearch').val(),
    method: "GET",
    success: function(res){
      console.log(res)
      var html = "";
      var yearHtml = "";
      
      if(res['models'] == undefined){
        html += '<option value="">Any</option>'
      }else{
        res['models'].forEach(function(data){
          html += '<option value="'+data+'">'+data+'</option>'
        })
      }

      res['years'].forEach(function(data){
        yearHtml += '<option value="'+data+'">'+data+'</option>'
      })

      $('#modelSelect').append('<option value="">Any</option>')
      $('#modelSelect').append(html)
      $('#modelSelect').val(filterval.model)
      $('#yearSelect').append('<option value="">Any</option>')
      $('#yearSelect').append(yearHtml)
      $('#yearSelect').val(filterval.year)
      if($('#modelSelect option').length == 1){
        $('#modelSelect').prop( "disabled", true );
      }else{
        $('#modelSelect').prop( "disabled", false );
      }
      
    }
  });
}

function SearchVehiclesMobile(){
  var filterval = Object.fromEntries(new URLSearchParams(location.search))
  $('#modelSelectMobile').empty();
  $('#yearSelectMobile').empty();
  $.ajax({
    url: "/inventory/getModels?make=" + $('#makeSelectMobile').val() + "&type="+ $('#VehicleTypeSearchMobile').val(),
    method: "GET",
    success: function(res){
      var html = "";
      var yearHtml = "";

      if(res['models'] == undefined){
        html += '<option value="">Any</option>'
      }else{
        res['models'].forEach(function(data){
          html += '<option value="'+data+'">'+data+'</option>'
        })
      }

      res['years'].forEach(function(data){
        yearHtml += '<option value="'+data+'">'+data+'</option>'
      })

      $('#modelSelectMobile').append('<option value="">Any</option>')
      $('#modelSelectMobile').append(html)
      $('#modelSelectMobile').val(filterval.model)
      $('#yearSelectMobile').append('<option value="">Any</option>')
      $('#yearSelectMobile').append(yearHtml)
      $('#yearSelectMobile').val(filterval.year)
      if($('#modelSelectMobile option').length == 1){
        $('#modelSelectMobile').prop( "disabled", true );
      }else{
        $('#modelSelectMobile').prop( "disabled", false );
      }
      
    }
  });
}

SearchVehicles();
SearchVehiclesMobile();
