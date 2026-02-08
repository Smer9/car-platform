function showSection(id) {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

function openLogin() {
  modal.classList.remove("hidden");
  modalTitle.innerText = "Login";
  name.classList.add("hidden");
  modalBtn.innerText = "Login";
  modalBtn.onclick = login;
}

function openRegister() {
  modal.classList.remove("hidden");
  modalTitle.innerText = "Register";
  name.classList.remove("hidden");
  modalBtn.innerText = "Register";
  modalBtn.onclick = register;
}

function closeModal() {
  modal.classList.add("hidden");
}
