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

// Copy Note

document.getElementById("copyNoteBtn").addEventListener("click", async () => {

    // Required Field Validation

    if (!spokeWith.value) {
        alert("Spoke With is required.");
        return;
    }

    if (!callerName.value) {
        alert("Caller's Name is required.");
        return;
    }

    if (!punr.value) {
        alert("PUNR is required.");
        return;
    }

    if (!deliveryDate.value) {
        alert("Delivery Date is required.");
        return;
    }

    if (!copay.value) {
        alert("Copay / AR Balance is required.");
        return;
    }

    if (!medicaid.value) {
        alert("Insurance Under Medicaid is required.");
        return;
    }

    if (!sameAddress.value) {
        alert("Address confirmation is required.");
        return;
    }

    if (!shippingAddress.value) {
        alert("Shipping Address is required.");
        return;
    }

    if (!growthHormone.value) {
        alert("Growth Hormone field is required.");
        return;
    }

    if (!shippingMethod.value) {
        alert("Shipping Method is required.");
        return;
    }

    let note = "CASE NOTE\n\n";

    // Always Include Required Fields

    note += `Spoke With: ${spokeWith.value}\n`;

    if (
        spokeWith.value === "Other" &&
        otherRelationship.value
    ) {
        note += `Other Relationship: ${otherRelationship.value}\n`;
    }

    note += `Caller's Name: ${callerName.value}\n`;

    // Include ALL Filled Fields

    if (mdOfficeHours.value)
        note += `MD Office Hours: ${mdOfficeHours.value}\n`;

    note += `PUNR: ${punr.value}\n`;

    if (orderNumber.value)
        note += `Order Number: ${orderNumber.value}\n`;

    if (deliveryDate.value)
        note += `Delivery Date: ${deliveryDate.value}\n`;

    if (copay.value)
        note += `Copay / AR Balance: ${copay.value}\n`;

    if (obeNeeded.value)
        note += `OBE Needed: ${obeNeeded.value}\n`;

    if (activeObe.value)
        note += `Active OBE: ${activeObe.value}\n`;

    if (medicaid.value)
        note += `Insurance Under Medicaid: ${medicaid.value}\n`;

    if (sameAddress.value)
        note += `Address Same As Previous Order: ${sameAddress.value}\n`;

    if (sameMd.value)
        note += `Same MD On Rx: ${sameMd.value}\n`;

    if (shippingAddress.value)
        note += `Shipping Address: ${shippingAddress.value}\n`;

    if (growthHormone.value)
        note += `Growth Hormone Medication: ${growthHormone.value}\n`;

    if (restrictedState.value)
        note += `Shipping State CO/ID/MN/NV/RI/WV: ${restrictedState.value}\n`;

    if (shippingMethod.value)
        note += `Shipping Method: ${shippingMethod.value}\n`;

    if (
        shippingMethod.value === "Other" &&
        otherShippingMethod.value
    ) {
        note += `Specified Shipping Method: ${otherShippingMethod.value}\n`;
    }

    // Copy To Clipboard

    await navigator.clipboard.writeText(note);

    // Save History

    let history = JSON.parse(
        localStorage.getItem("caseNotes") || "[]"
    );

    history.unshift({
        date: new Date().toLocaleString(),
        note: note
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
