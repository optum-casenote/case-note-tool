const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", () => {
    const patientName = document.getElementById("patientName").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const medication = document.getElementById("medication").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const notes = document.getElementById("notes").value.trim();

    const caseNote = `
PATIENT NAME: ${patientName || "N/A"}
DOB: ${dob || "N/A"}
MEDICATION: ${medication || "N/A"}

REASON FOR CALL:
${reason || "N/A"}

CASE NOTES:
${notes || "N/A"}

DOCUMENTATION COMPLETED.
`;

    document.getElementById("output").value = caseNote.trim();
});

copyBtn.addEventListener("click", async () => {
    const output = document.getElementById("output");

    if (!output.value.trim()) {
        alert("Nothing to copy.");
        return;
    }

    try {
        await navigator.clipboard.writeText(output.value);
        copyBtn.textContent = "Copied!";
        
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 2000);

    } catch (error) {
        alert("Copy failed.");
    }
});

clearBtn.addEventListener("click", () => {
    document.getElementById("patientName").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("medication").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("output").value = "";
});
