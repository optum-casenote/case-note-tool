// LIVE CLOCKS

function updateClocks() {

document.getElementById("phTime").textContent =
new Date().toLocaleTimeString("en-US",{
timeZone:"Asia/Manila"
});

document.getElementById("estTime").textContent =
new Date().toLocaleTimeString("en-US",{
timeZone:"America/New_York"
});

}

updateClocks();
setInterval(updateClocks,1000);

// TABS

const noteBtn = document.getElementById("noteTabBtn");
const historyBtn = document.getElementById("historyTabBtn");

const noteTab = document.getElementById("noteTab");
const historyTab = document.getElementById("historyTab");

noteBtn.onclick=()=>{
noteTab.classList.remove("hidden");
historyTab.classList.add("hidden");

noteBtn.classList.add("active");
historyBtn.classList.remove("active");
};

historyBtn.onclick=()=>{
historyTab.classList.remove("hidden");
noteTab.classList.add("hidden");

historyBtn.classList.add("active");
noteBtn.classList.remove("active");

renderHistory();
};

// OTHER RELATIONSHIP

document.getElementById("spokeWith")
.addEventListener("change",function(){

document.getElementById(
"otherRelationshipContainer"
).style.display =
this.value==="Other"
? "block"
: "none";

});

// SHIPPING METHOD

document.getElementById("shippingMethod")
.addEventListener("change",function(){

document.getElementById(
"otherShippingContainer"
).style.display =
this.value==="Other"
? "block"
: "none";

});

// ENABLE COPY

document.getElementById("attestation")
.addEventListener("change",function(){

document.getElementById("copyNoteBtn")
.disabled=!this.checked;

});

// COPY NOTE

document.getElementById("copyNoteBtn")
.addEventListener("click",()=>{

const note=`CASE NOTE

Spoke With: ${spokeWith.value}

Caller's Name: ${callerName.value}

PUNR: ${punr.value}

Delivery Date: ${deliveryDate.value}

Copay / AR Balance: ${copay.value}

Shipping Address:
${shippingAddress.value}
`;

navigator.clipboard.writeText(note);

let history =
JSON.parse(
localStorage.getItem("caseHistory")
|| "[]"
);

history.unshift({
date:new Date().toLocaleString(),
note
});

localStorage.setItem(
"caseHistory",
JSON.stringify(history)
);

alert(
"Case note copied and saved successfully."
);

});

// RENDER HISTORY

function renderHistory(){

const container =
document.getElementById(
"historyContainer"
);

container.innerHTML="";

const history=
JSON.parse(
localStorage.getItem(
"caseHistory"
)||"[]"
);

history.forEach(item=>{

container.innerHTML += `
<div class="history-card">
<small>${item.date}</small>
<pre>${item.note}</pre>
</div>
`;

});

}

// CLEAR

document.getElementById("clearBtn")
.addEventListener("click",()=>{

if(!confirm("Clear all fields?"))
return;

document
.querySelectorAll(
"input[type=text],input[type=number],textarea"
)
.forEach(el=>el.value="");

document
.querySelectorAll("select")
.forEach(el=>el.selectedIndex=0);

document
.getElementById("attestation")
.checked=false;

document
.getElementById("copyNoteBtn")
.disabled=true;

});
