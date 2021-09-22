/* All required variables */
const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

const apiKey = "fef4fd2a17681a6954924631"

/* ===== Setando Valores nos Select ===== */
for(let i=0; i < dropList.length; i++) {
    for(currency_code in country_code) {
        // selecting USD by default as FROM currency and BRL as TO currency
        let seleted;
        if(i == 0) {
            seleted = currency_code == "USD" ? "selected" : ""
        } else if(i == 1) {
            seleted = currency_code == "BRL" ? "selected" : ""
        }

        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${seleted}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend", optionTag)
        //dropList[i].innerHTML += optionTag
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); //calling loadFlag with passing target element as an argument
    })
}

function loadFlag(element) {
    for(code in country_code) {
        // if currency code of country list is equal to option value
        if(code == element.value) { 
            // selecting img tag of particular drop list
            let imgTag = element.parentElement.querySelector("img");
            //passing country code of a selected currency code in a img url
            imgTag.src = `https://www.countryflags.io/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", ()=> {
    getExchangeRate();
})


getButton.addEventListener("click", e=> {
    //preventDefault(): função que previne um comportamento padrão de um elemento, ex: não carregar o link ao clicar numa tag <a href>

    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromCurrency.value;// temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value;// passing TO currency code to FROM currency code
    toCurrency.value = tempCode;// passing temporary currency code to TO currency code
    loadFlag(fromCurrency)// calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency)// calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input")
    const exchangeRateTxt = document.querySelector(".exchange-rate")
    let amountVal = amount.value.trim();

    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == 0) {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeRateTxt.innerHTML = "Getting exchange rate..."

    // using Exchange rate API for this project (site: Exchange Rate API Free)
    let url = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`

    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        //console.log(exchangeRate)
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2)
        console.log(totalExchangeRate)

        
        exchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value} `
    }).catch(()=> {// if user is offline or any other error ocurred while fetching data then catch function will run
        exchangeRateTxt.innerHTML = "Something went wrong!"
    })

    
}

