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
<form action="#">
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
</div>`

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

const dropList = document.querySelectorAll('.drop-list select'),
fromCurrency=document.querySelector('.from select'),
toCurrency=document.querySelector('.to select'),
getButton = document.querySelector('form button');

/* looping through the external file in main.js, where the cuntry names and codes are stored. then appending these to the drop down list within the HTML*/
for(let i=0; i<dropList.length; i++){
  for(currency_code in country_list){
    let selected;
    if(i==0){
      selected=currency_code == 'GBP' ? 'selected' :'';
    }else if(i==1){
      selected=currency_code == 'USD' ? 'selected' :'';
    }
    
    let optionTag = `<option value='${currency_code}'${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  dropList[i].addEventListener('change', e =>{
    loadFlag(e.target);
  })
}

function loadFlag(element){
  for (code in country_list){
    if(code == element.value){
      let imgTag = element.parentElement.querySelector('img');
      imgTag.src=`https://flagsapi.com/${country_list[code]}/flat/64.png`
    }
  }
}

window.addEventListener('load', () =>{
  getExchangeRate();
}); /*this shows the exchange rate txt while function is working*/
getButton.addEventListener('click', e =>{
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click', ()=>{
  let tempCode = fromCurrency.value;
  fromCurrency.value=toCurrency.value;
  toCurrency.value=tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

/**this puts a 1 in the input field should the 
 * user enter 0 or there is no input */
function getExchangeRate(){
  const amount = document.querySelector('.amount input'),
  exchangeRateTxt = document.querySelector('.exchange-rate');
  let amountVal = amount.value;
  if(amountVal == '' || amountVal =='0'){
    amount.value ='1';
    amountVal = 1;
  }
  exchangeRateTxt.innerText='Getting exchange rate...';
  let url = `https://v6.exchangerate-api.com/v6/d385fb5ca97d322707952cfa/latest/${fromCurrency.value}`;
  fetch(url).then(response => response.json()).then(result =>{
    let exchangeRate=result.conversion_rates[toCurrency.value];
    let totalExchangeRate=(amountVal * exchangeRate).toFixed(2);
    exchangeRateTxt.innerText =`${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
  }).catch(()=>{
    exchangeRateTxt.innerText='Something went wrong'; //used if there is an error, then this message will load.
  });
}


