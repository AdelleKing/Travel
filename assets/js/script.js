console.log('I am working');

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


