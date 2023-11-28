var div = document.getElementById('main');
var display = 0;

var bucketlist = `<a href="index.html" class=“button”>Back</a> <div class="holiday-form"> 
<h1>Holiday CheckList</h1>        
<form>
<input type="checkbox" id="passport" name="passport" value="passport1">
<label for="passport"> Checked passport is in date</label><br>
<input type="checkbox" id="insurance" name="insurnace" value="Insurnace1">
<label for="insurance"> I have holiday insurance</label><br>
<input type="checkbox" id="visa" name="visa" value="Visa1">
<label for="visa"> I checked if I need a visa</label>
</form>   
</div>`
var currency = `<a href="index.html" class=“button”>Back</a>  <div class="wrapper">
<h5 class="currency">Currency Converter</h5>
<form action="#" >
  <div class="amount">
    <p> Enter Amount</p>
    <input id='amount' type="text" value="1">
  </div>
  <div class="drop-list">
    <div class="from">
    <p>From</p>
    <div class="select-box">
      <img src="https://flagsapi.com/GB/flat/64.png" alt="flags">
    <select></select>
    </div>
  </div>
  <div class="icon"><i class="fa-solid fa-arrow-right-arrow-left"></i></div>
  <div class="to">
    <p>To</p>
    <div class="select-box">
      <img src="https://flagsapi.com/US/flat/64.png" alt="flags">
    <select></select>               
    </div>
  </div>
</div>
<div class="exchange-rate">Getting exchange rate...</div>
<button>Get Exchange Rate</button>
</form>
</div>
<script src="assets.js.script.js"></script><script src="assets/js/countries.js"></script>`

function showBucketList(){
  if (display == 1){
    div.style.visibility ='visible';
    div.innerHTML = bucketlist;
    display = 0;
  }   
  else {
    div.style.visibility ='visible';
    display =1;
  }
}

function showCurrency(){
  if (display == 1){
    div.style.visibility ='visible';
    div.innerHTML = currency;
    display = 0;
  } else {
    div.style.visibility ='visible';
    display =1;
  }
}

function showCalendar(){
  if (display == 1){
    div.style.visibility ='visible';
    div.innerHTML = `<a href="index.html" class=“button”>Back</a> <p>Calendar will go here </p>`;
    display = 0;
  } else {
    div.style.visibility ='visible';
    display =1;
  }
}
console.log('working');

let map;
let service;
let infowindow;

function initMap() {
  const sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  const request = {
    query: "Museum of Contemporary Art Australia",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap

