var div = document.getElementById('main');
var currency = document.getElementById('hidden');
var bucket = document.getElementById('bucketListHidden');
var display = 0;

/**when the user clicks the Holiday Checklist button, this
 * function will run displaying the to-do list. it is set to hidden on page load
 * and changed to visible when clicked.
*/
function showHolidayList(){
  if (display == 1){
    div.style.visibility ='visible';
    bucket.style.display ='block';
    display = 0;
  }   
  else {
    div.style.visibility ='visible';
    display =1;
  }
}

/**when the user clicks the currency converter button, this
 * function will run displaying the currency converter. it is set to hidden on page load
 * and changed to visible when clicked.
*/
function showCurrency(){
  if (display == 1){   
    div.style.visibility='visible';
    currency.style.display ='block';
    display = 0;
  } else {
    div.style.visibility ='visible';
    display =1;
  }
}



let map;
let service;
let infowindow;


/**displays the google map when the page loads, 
 * this is an API, providing real time data. 
 */
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



/**holiday checklist
 * this functionality allows for the user to add thier own to-do items to the list. 
 * it alsp creates the strike through effect on the newly added elements. 
 * I have also added an alert to the page should the user
 * click the add button without text in the field.
 * 
*/
function createCheckbox() {
  // Get the input element and its value
  var input = document.getElementById("inputText");
  var text = input.value;
  if(text === ''){
    alert('text field is empty')
    return;
  }
  // I did try to change the placeholder text to replace the alert, but
  //found the text did not remove when the user then clicked within the field.
  //I felt from a UX perspective, requiering the user to remove this new wording before
  //typing themselves was bad UX design. 
 

  // Create a new checkbox element
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = text;
  checkbox.name = text;
  

  // Create a new label element and append the text
  var label = document.createElement("label");
  label.appendChild(document.createTextNode(text));
  label.className = 'strikethrough'

  // Append the checkbox and label to the document
  var container = document.getElementById("container");
  container.appendChild(checkbox);
  container.appendChild(label);
  container.appendChild(document.createElement("br"));

  // Clear the input value
  input.value = "";

  }


