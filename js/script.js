/* All required variables */
const dropList = document.querySelectorAll(".drop-list select"),
getButton = document.querySelector("form button");


/* ===== Setando Valores nos Select ===== */
for(let i=0; i < dropList.length; i++) {
    for(currency_code in country_code) {
        // selecting USD by default as FROm currency and BRL as TO currency
        let seleted;
        if(i == 0) {
            seleted = currency_code == "USD" ? "selected" : ""
        } else if(i == 1) {
            seleted = currency_code == "BRL" ? "selected" : ""
        }

        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${seleted}>${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend", optionTag)
    }
}


getButton.addEventListener("click", e=> {
    //preventDefault(): função que previne um comportamento padrão de um elemento, ex: não carregar o link ao clicar numa tag <a href>

    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
})

function getExchangeRate() {
    
}

