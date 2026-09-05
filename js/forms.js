/* Loop & Bloom — forms.js (contact + custom order validation) */

function validateField(field) {
  const wrap = field.closest(".form-field");
  const errorEl = wrap?.querySelector(".field-error");
  let message = "";
  if (field.hasAttribute("required") && !field.value.trim()) {
    message = "This field is needed.";
  } else if (field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
    message = "Add a valid email address.";
  }
  if (wrap) wrap.classList.toggle("has-error", !!message);
  if (errorEl) errorEl.textContent = message;
  return !message;
}

function initForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;
  const fields = form.querySelectorAll("input[required], textarea[required], select[required], input[type=email]");

  fields.forEach(f => {
    f.addEventListener("blur", () => validateField(f));
    f.addEventListener("input", () => {
      const wrap = f.closest(".form-field");
      if (wrap?.classList.contains("has-error")) validateField(f);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });
    if (!valid) {
      const firstError = form.querySelector(".has-error input, .has-error textarea, .has-error select");
      firstError?.focus();
      showToast("Please check the highlighted fields");
      return;
    }
    form.style.display = "none";
    const success = document.getElementById(successId);
    success?.classList.add("show");
    success?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function initFileDrop(dropId, inputId, labelId) {
  const drop = document.getElementById(dropId);
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);
  if (!drop || !input) return;
  drop.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    if (input.files.length && label) label.textContent = input.files[0].name;
  });
  ["dragenter", "dragover"].forEach(evt => drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.add("drag"); }));
  ["dragleave", "drop"].forEach(evt => drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.remove("drag"); }));
  drop.addEventListener("drop", (e) => {
    if (e.dataTransfer.files.length) {
      input.files = e.dataTransfer.files;
      if (label) label.textContent = e.dataTransfer.files[0].name;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initForm("contactForm", "contactSuccess");
  initForm("customOrderForm", "customOrderSuccess");
  initFileDrop("fileDrop", "fileInput", "fileLabel");
});
