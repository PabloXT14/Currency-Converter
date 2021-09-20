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
}


getButton.addEventListener("click", e=> {
    //preventDefault(): função que previne um comportamento padrão de um elemento, ex: não carregar o link ao clicar numa tag <a href>

    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input")
    let amountVal = amount.value.trim();

    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == 0) {
        amount.value = "1";
        amountVal = 1;
    }

    // using Exchange rate API for this project (site: Exchange Rate API Free)
    let url = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response => console.log(response.json()))

    //teste
    let result = `${amountVal} ${fromCurrency.value} = `
}

