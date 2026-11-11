
// ==========================
// CLOCKS
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    function updateClocks() {
        const now = new Date();

        // Philippines Time
        document.getElementById("phTime").textContent =
            now.toLocaleTimeString("en-US", {
                timeZone: "Asia/Manila",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });

        // Central Time
        document.getElementById("ctTime").textContent =
            now.toLocaleTimeString("en-US", {
                timeZone: "America/Chicago",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });
    }

    updateClocks();
    setInterval(updateClocks, 1000);

});
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

    // Required Validation

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

    if (!shippingMethod.value) {
        alert("Shipping Method is required.");
        return;
    }

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

   if (
    shippingMethod.value === "Other" &&
    otherShippingMethod.value
) {
    note += `Specified Shipping Method: ${otherShippingMethod.value}\n`;
}

// Attestation
note += `\nI attest that I have verified with the patient that there are no changes to the insurance on file.\n`;

// Shipping Reminder
note += `\nShipping Reminder:\nDeliveries to CO, ID, MN, NV, RI, and WV must require a signature.\n`;

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
    type: "DEL SET",
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

   container.innerHTML += `
<div class="history-card">

    <div class="history-date">
        ${item.date}
    </div>

    <div class="history-type ${
        item.type === "STANDARD"
            ? "standard-badge"
            : "delset-badge"
    }">
        ${item.type || "DEL SET"}
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

// ==========================
// STANDARD NOTE
// ==========================

const copyStandardBtn =
    document.getElementById("copyStandardBtn");

if (copyStandardBtn) {

    copyStandardBtn.addEventListener("click", async () => {

        const caller =
            document.getElementById("stdCaller");

        const relationship =
            document.getElementById("stdRelationship");

        const medication =
            document.getElementById("stdMedication");

        const issue =
            document.getElementById("stdIssue");

        const resolution =
            document.getElementById("stdResolution");

        if (!caller.value.trim()) {
            alert("Caller's Name is required.");
            return;
        }

        if (!relationship.value.trim()) {
            alert("Relationship / Title is required.");
            return;
        }

        if (!medication.value.trim()) {
            alert("Medication is required.");
            return;
        }

        if (!issue.value.trim()) {
            alert("Issue / Reason for Call is required.");
            return;
        }

        if (!resolution.value.trim()) {
            alert("Resolution / Outcome is required.");
            return;
        }

        const note = `STANDARD CASE NOTE

CALLER'S NAME:
${caller.value}

RELATIONSHIP TO PATIENT / TITLE:
${relationship.value}

MEDICATION:
${medication.value}

ISSUE / REASON FOR CALL:
${issue.value}

RESOLUTION / OUTCOME:
${resolution.value}`;

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
            type: "STANDARD",
            date: new Date().toLocaleString(),
            note: note
        });

        localStorage.setItem(
            "caseNotes",
            JSON.stringify(history)
        );

        alert("Standard note copied and saved.");
    });

}

// ==========================
// CLEAR STANDARD
// ==========================

document
.getElementById("clearStandardBtn")
?.addEventListener("click", () => {

    if (!confirm("Clear Standard Note?"))
        return;

    document.getElementById("stdCaller").value = "";
    document.getElementById("stdRelationship").value = "";
    document.getElementById("stdMedication").value = "";
    document.getElementById("stdIssue").value = "";
    document.getElementById("stdResolution").value = "";

});
