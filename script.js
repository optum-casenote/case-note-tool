// ==========================
// CLOCKS
// ==========================

function updateClocks() {

    document.getElementById("phTime").textContent =
        new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Manila"
        });

    document.getElementById("estTime").textContent =
        new Date().toLocaleTimeString("en-US", {
            timeZone: "America/New_York"
        });

}

updateClocks();
setInterval(updateClocks, 1000);

// ==========================
// ELEMENTS
// ==========================

const noteBtn = document.getElementById("noteTabBtn");
const historyBtn = document.getElementById("historyTabBtn");

const noteTab = document.getElementById("noteTab");
const historyTab = document.getElementById("historyTab");

const copyBtn = document.getElementById("copyNoteBtn");

// ==========================
// TAB SWITCHING
// ==========================

noteBtn.addEventListener("click", () => {

    noteTab.classList.remove("hidden");
    historyTab.classList.add("hidden");

    noteBtn.classList.add("active");
    historyBtn.classList.remove("active");

});

historyBtn.addEventListener("click", () => {

    historyTab.classList.remove("hidden");
    noteTab.classList.add("hidden");

    historyBtn.classList.add("active");
    noteBtn.classList.remove("active");

    loadHistory();

});

// ==========================
// OTHER RELATIONSHIP
// ==========================

document.getElementById("spokeWith")
.addEventListener("change", function () {

    document.getElementById(
        "otherRelationshipContainer"
    ).style.display =
        this.value === "Other"
            ? "block"
            : "none";

});

// ==========================
// OTHER SHIPPING METHOD
// ==========================

document.getElementById("shippingMethod")
.addEventListener("change", function () {

    document.getElementById(
        "otherShippingContainer"
    ).style.display =
        this.value === "Other"
            ? "block"
            : "none";

});

// ==========================
// CURRENCY FORMAT
// ==========================

document.getElementById("copay")
.addEventListener("blur", function () {

    let num = this.value.replace(/[^\d.]/g, "");

    if (!num) return;

    this.value = Number(num).toLocaleString(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    );

});

// ==========================
// ATTESTATION
// ==========================

document.getElementById("attestation")
.addEventListener("change", function () {

    copyBtn.disabled = !this.checked;

});

// ==========================
// COPY NOTE
// ==========================

copyBtn.addEventListener("click", async () => {

    const spokeWith = document.getElementById("spokeWith");
    const otherRelationship = document.getElementById("otherRelationship");
    const callerName = document.getElementById("callerName");
    const mdOfficeHours = document.getElementById("mdOfficeHours");
    const punr = document.getElementById("punr");
    const orderNumber = document.getElementById("orderNumber");
    const deliveryDate = document.getElementById("deliveryDate");
    const copay = document.getElementById("copay");
    const obeNeeded = document.getElementById("obeNeeded");
    const activeObe = document.getElementById("activeObe");
    const medicaid = document.getElementById("medicaid");
    const sameAddress = document.getElementById("sameAddress");
    const sameMd = document.getElementById("sameMd");
    const shippingAddress = document.getElementById("shippingAddress");
    const growthHormone = document.getElementById("growthHormone");
    const restrictedState = document.getElementById("restrictedState");
    const shippingMethod = document.getElementById("shippingMethod");
    const otherShippingMethod = document.getElementById("otherShippingMethod");

    if (!spokeWith.value) {
        alert("Spoke With is required.");
        return;
    }

    if (!callerName.value.trim()) {
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

    if (!copay.value.trim()) {
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

    if (!shippingAddress.value.trim()) {
        alert("Shipping Address is required.");
        return;
    }

    if (!growthHormone.value) {
        alert("Growth Hormone field is required.");
        return;
    }

    if (
    shippingMethod.value === "Other" &&
    otherShippingMethod.value
) {
    note += `Specified Shipping Method: ${otherShippingMethod.value}\n`;
}

note += `\n`;
note += `Shipping Reminder:\n`;
note += `Deliveries to CO, ID, MN, NV, RI, and WV must require a signature.\n\n`;

note += `I attest that I have verified with the patient that there are no changes to the insurance on file.\n`;
``

    if (
        shippingMethod.value === "Other" &&
        !otherShippingMethod.value.trim()
    ) {
        alert("Specify Shipping Method.");
        return;
    }

    let note = "CASE NOTE\n\n";

    note += `Spoke With: ${spokeWith.value}\n`;

    if (
        spokeWith.value === "Other" &&
        otherRelationship.value
    ) {
        note += `Other Relationship: ${otherRelationship.value}\n`;
    }

    note += `Caller's Name: ${callerName.value}\n`;

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

    note += `\n====================================\n`;
    note += `SHIPPING REMINDER\n`;
    note += `====================================\n`;
    note += `Deliveries to CO, ID, MN, NV, RI, and WV must require a signature.\n`;

    note += `\n====================================\n`;
    note += `ATTESTATION\n`;
    note += `====================================\n`;
    note += `I attest that I have verified with the patient that there are no changes to the insurance on file.\n`;

    try {

        await navigator.clipboard.writeText(note);

    } catch {

        alert("Unable to copy note.");
        return;

    }

    let history =
        JSON.parse(
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

// ==========================
// HISTORY
// ==========================

function loadHistory() {

    const container =
        document.getElementById("historyContainer");

    const history =
        JSON.parse(
            localStorage.getItem("caseNotes") || "[]"
        );

    if (history.length === 0) {

        container.innerHTML = `
            <div class="empty-history">
                No saved case notes yet.
            </div>
        `;

        return;
    }

    container.innerHTML = "";

    history.forEach(item => {

        container.innerHTML += `
            <div class="history-card">
                <div class="history-date">
                    ${item.date}
                </div>

                <div class="history-note">
                    ${item.note.replace(/\n/g, "<br>")}
                </div>
            </div>
        `;

    });

}

// ==========================
// CLEAR FORM
// ==========================

document.getElementById("clearBtn")
.addEventListener("click", () => {

    if (!confirm("Clear all fields?")) {
        return;
    }

    document
        .querySelectorAll("input, textarea")
        .forEach(el => {

            if (el.type === "checkbox") {
                el.checked = false;
            } else {
                el.value = "";
            }

        });

    document
        .querySelectorAll("select")
        .forEach(el => {

            el.selectedIndex = 0;

        });

    document.getElementById(
        "otherRelationshipContainer"
    ).style.display = "none";

    document.getElementById(
        "otherShippingContainer"
    ).style.display = "none";

    copyBtn.disabled = true;

});
