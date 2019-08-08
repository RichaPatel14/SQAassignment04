//Validate if input is blank and raise error
function checkBlank(id, errorId) {
    var data = document.getElementById(id).value;
    if (data == "") {
        document.getElementById(errorId).innerHTML = "Please fill this field";
		return false;
    } else {
        document.getElementById(errorId).innerHTML = "";
		return true;
    }
}

//Validate Email id  and raise error
function checkemailId() {
    var mail = document.getElementById("email").value;
    var emailAt = mail.indexOf("@");
    var emailDot = mail.lastIndexOf(".");
    if (emailAt < 4 || emailDot < emailAt + 3 || mail == "") {
        document.getElementById("errorEmail").innerHTML = "Please enter valid email address.";
		return false;
    } else {
        document.getElementById("errorEmail").innerHTML = "";
		return true;
    }
}

//Validate Contact number and raise error
function isNumberKey(evt, show) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        document.getElementById(show).innerHTML = "Please enter numbers only.";
        return false;
    }
    return true;
}

//Store Information in Local Storage
function storeInfos() {
	//validation
	var flag =  validationAll();
	console.log(flag);
	if(!flag){
		console.log("called");
		return false;
	}
	
	//get User input 
    var name = document.getElementById("cname").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value
    var carDetails = document.getElementById("vehicle").value;
    var blank = "_blank";
    document.getElementById("success").innerHTML = "Test case is successfull.";


	//Extract Make, model and year from user input
    siteArray = carDetails.split(" ", 3);
    var make = siteArray[0];
    var model = siteArray[1];
    var year = siteArray[2];
    var site = "https://www.jdpower.com/cars/" + make + "/" + model + "/" + year + "";
	
	//Create Object
    data = {
        'name': name,
        'address': address,
        'city': city,
        'carDetails': carDetails,
        'site': site
    };
    dataList = [];
    if (localStorage.getItem("data") != null) {
        dataList = JSON.parse(localStorage.getItem("data"));

    }
	//Push data in array
    dataList.push(data);
	
	//Save Data
    localStorage.setItem("data", JSON.stringify(dataList));
    console.log("false");
    console.log(dataList);
	return true;
}

//Validate all fields
function validationAll() {
	var flags = []
	var flag = true;
    flags[0] = checkemailId();
    flags[1] = checkBlank('phone', 'errorphone');
    flags[2] = checkBlank('cname', 'errorName');
    flags[3] = checkBlank('address', 'errorAdd');
    flags[4] = checkBlank('city', 'errorCity');
    flags[5] = checkBlank('vehicle', 'errorveh');
	
	for(var i = 0;i<flags.length;i++){
		if(flags[i]===false){
		  flag =  false;
		  console.log("called");
	  }
	}
	return flag;
	

}

//Car Search function for any field
function CarSearch() {
    window.location.href = '#carInformation';
    console.log("search");
    dataList = JSON.parse(localStorage.getItem("data"));
    console.log(dataList);
    var search = document.getElementById('search').value;
    storeDetails.innerHTML = '';
    if (dataList.length > 0) {
        dataList.forEach(function(data) {
            if (data.name.includes(search) || data.address.includes(search) || data.city.includes(search) || data.carDetails.includes(search)) {
                storeDetails.innerHTML += "Seller name is " + data.name + " and is from " + data.address + " in " + data.city + " city and car is <a href=" + data.site + " target='_blank'>" + data.carDetails + "</a>. <br/><br/>";
            }
        });
    }
}

//Load All previous data from LocalStorage
function onload() {
    console.log("onload");
    dataList = JSON.parse(localStorage.getItem("data"));
    console.log(dataList);
    if (dataList.length > 0) {
        dataList.forEach(function(data) {
            storeDetails.innerHTML += "Seller name is " + data.name + " and is from " + data.address + " in " + data.city + " city and car is <a href=" + data.site + " target='_blank'>" + data.carDetails + "</a>. <br/><br/>";
        });
    }
}