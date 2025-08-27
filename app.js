const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon = document.querySelector(".icon");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag();
  });
}


icon.addEventListener("click",(ele) => {
     
    let fromVal = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = fromVal;
    updateFlag();
});

var currentDate = new Date();
var year = currentDate.getFullYear();
var month = currentDate.getMonth() + 1;
if(month<10)
{
  month = '0'+month;
}

var date = currentDate.getDate();
if(date<10)
{
  date = '0'+date;
}

const formattedDate =  year + '-' + month + '-' + date;

const updateExchangeRate = async () => {
  let from = (fromCurr.value).toLowerCase();
  let to = (toCurr.value).toLowerCase();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/usd.json`;
  let response = await fetch(URL);
  let data = await response.json();
  
  let usdToFrom = data["usd"][from];
  let usdToto = data["usd"][to];

  let fromtorate = usdToto/usdToFrom;

  let finalAmount = (amtVal * fromtorate).toFixed(5);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  img1.src =  `https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`;
  img2.src =  `https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

//`https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${fromCurr.value}_${toCurr.value}.json`;
