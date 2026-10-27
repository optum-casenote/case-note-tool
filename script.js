// CLOCKS

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

const noteBtn=document.getElementById("noteTabBtn");
const historyBtn=document.getElementById("historyTabBtn");

const noteTab=document.getElementById("noteTab");
const historyTab=document.getElementById("historyTab");

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
loadHistory();
};

// Other Relationship

document.getElementById("spokeWith").addEventListener("change",function(){

document.getElementById("otherRelationshipContainer").style.display =
this.value==="Other" ? "block" : "none";

});

// Other Shipping

document.getElementById("shippingMethod").addEventListener("change",function(){

document.getElementById("otherShippingContainer").style.display =
this.value==="Other" ? "block" : "none";

});

// Currency

document.getElementById("copay").addEventListener("blur",function(){

let num=this.value.replace(/[^\d.]/g,'');

if(num){
this.value=Number(num).toLocaleString(
'en-US',
{
style:'currency',
currency:'USD'
}
);
}

});

// Attestation

document.getElementById("attestation").addEventListener("change",function(){

document.getElementById("copyNoteBtn").disabled=!this.checked;

});

// Copy Note

document.getElementById("copyNoteBtn").addEventListener("click",async()=>{

let note="CASE NOTE\n\n";

if(callerName.value)
note += `Caller's Name: ${callerName.value}\n`;

if(mdOfficeHours.value)
note += `MD Office Hours: ${mdOfficeHours.value}\n`;

note += `Spoke With: ${spokeWith.value}\n`;
note += `PUNR: ${punr.value}\n`;

if(orderNumber.value)
note += `Order Number: ${orderNumber.value}\n`;

note += `Delivery Date: ${deliveryDate.value}\n`;
note += `Copay / AR Balance: ${copay.value}\n`;

await navigator.clipboard.writeText(note);

let history =
JSON.parse(localStorage.getItem("caseNotes") || "[]");

history.unshift({
date:new Date().toLocaleString(),
note
});

localStorage.setItem(
"caseNotes",
JSON.stringify(history)
);

alert("Case note copied and saved successfully.");

});

// History

function loadHistory(){

const container=document.getElementById("historyContainer");

container.innerHTML="";

const history=
JSON.parse(localStorage.getItem("caseNotes")||"[]");

history.forEach(item=>{

container.innerHTML+=`
<div class="history-card">
<div>${item.date}</div>
<pre>${item.note}</pre>
</div>
`;

});

}

// Clear

document.getElementById("clearBtn").addEventListener("click",()=>{

if(!confirm("Clear all fields?")) return;

document.querySelectorAll("input, textarea")
.forEach(el=>{

if(el.type==="checkbox"){
el.checked=false;
}else{
el.value="";
}

});

document.querySelectorAll("select")
.forEach(el=>el.selectedIndex=0);

copyNoteBtn.disabled=true;

});
