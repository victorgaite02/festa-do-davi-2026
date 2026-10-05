const API_URL = "https://festa-do-davi-2026.gaite.chatgpt.site/api/rsvp";
const form = document.getElementById("rsvp-form");
const counts = document.getElementById("guest-counts");
const nameFields = document.getElementById("guest-name-fields");
const attendanceInputs = [...form.querySelectorAll('input[name="attendance"]')];
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const submitButton = form.querySelector('button[type="submit"]');
const errorMessage = document.getElementById("form-error");
const adultNames = [];
const childNames = [];

function createNameField(id, labelText, placeholder, value, onChange) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.htmlFor = id;
  label.textContent = labelText;
  input.id = id;
  input.type = "text";
  input.autocomplete = "off";
  input.minLength = 2;
  input.maxLength = 80;
  input.required = true;
  input.placeholder = placeholder;
  input.value = value || "";
  input.addEventListener("input", () => onChange(input.value));
  wrapper.append(label, input);
  return wrapper;
}

function renderNameFields() {
  const attending = form.elements.attendance.value === "yes";
  const adultCount = Math.min(20, Math.max(1, Number(adults.value) || 1));
  const childCount = Math.min(20, Math.max(0, Number(children.value) || 0));
  nameFields.replaceChildren();
  if (attending) {
    for (let index = 0; index < adultCount - 1; index++) {
      nameFields.append(createNameField(
        "adult-name-" + index,
        "Nome do " + (index + 2) + "º adulto",
        "Nome do adulto",
        adultNames[index],
        (value) => { adultNames[index] = value; },
      ));
    }
    for (let index = 0; index < childCount; index++) {
      nameFields.append(createNameField(
        "child-name-" + index,
        "Nome da " + (index + 1) + "ª criança",
        "Nome da criança",
        childNames[index],
        (value) => { childNames[index] = value; },
      ));
    }
  }
  nameFields.hidden = !attending || (adultCount === 1 && childCount === 0);
}

function updateAttendance() {
  const attending = form.elements.attendance.value === "yes";
  counts.hidden = !attending;
  adults.disabled = !attending;
  children.disabled = !attending;
  adults.required = attending;
  attendanceInputs.forEach((input) => {
    input.closest("label").classList.toggle("selected", input.checked);
  });
  renderNameFields();
}

attendanceInputs.forEach((input) => input.addEventListener("change", updateAttendance));
[adults, children].forEach((input) => input.addEventListener("input", renderNameFields));
updateAttendance();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;
  submitButton.disabled = true;
  submitButton.firstChild.textContent = "Enviando... ";

  const data = new FormData(form);
  const attending = data.get("attendance") === "yes";
  const name = String(data.get("name") || "").trim();
  const adultCount = attending ? Number(data.get("adults")) : 0;
  const childCount = attending ? Number(data.get("children")) : 0;
  const payload = {
    name,
    attending,
    adults: adultCount,
    children: childCount,
    adultNames: attending ? [name, ...adultNames.slice(0, adultCount - 1).map((value) => String(value || "").trim())] : [],
    childNames: attending ? childNames.slice(0, childCount).map((value) => String(value || "").trim()) : [],
    website: String(data.get("website") || ""),
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) throw new Error(result?.error || "Não foi possível enviar sua confirmação agora. Tente novamente em instantes.");
    document.getElementById("confirmation-panel").hidden = true;
    document.getElementById("sizes-panel").hidden = false;
    document.getElementById("success-greeting").textContent = "Resposta recebida, " + name + "!";
    document.getElementById("tamanhos").focus();
  } catch (error) {
    errorMessage.textContent = error instanceof Error && (error.message.startsWith("Não foi possível") || error.message.startsWith("Confira"))
      ? error.message
      : "Não foi possível enviar sua confirmação agora. Tente novamente em instantes.";
    errorMessage.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.firstChild.textContent = "Enviar confirmação ";
  }
});
