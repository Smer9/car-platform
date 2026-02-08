// ===============================
// GLOBAL STATE
// ===============================
let cars = [];
let currentAction = null;

// ===============================
// LOAD CARS
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadCars();
});

async function loadCars() {
  try {
    const res = await fetch("/api/cars");
    cars = await res.json();
    renderCars(cars);
  } catch {
    alert("Failed to load cars");
  }
}

// ===============================
// FILTERS
// ===============================
function filterCars(type) {
  if (type === "sale") {
    renderCars(cars.filter(c => c.type === "sale"));
  } else if (type === "rent") {
    renderCars(cars.filter(c => c.type === "rent"));
  } else {
    renderCars(cars);
  }
}

// ===============================
// RENDER
// ===============================
function renderCars(list) {
  const container = document.getElementById("cars");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No cars found.</p>";
    return;
  }

  list.forEach(car => {
    const card = document.createElement("div");
    card.className = "car-card";

    card.innerHTML = `
      <img src="${car.image}" alt="${car.brand}">
        <h3>
            <a href="car.html?id=${car._id}" style="text-decoration:none;color:#000">
                ${car.brand} ${car.model}
            </a>
        </h3>

      <p>${car.year}</p>
      <p class="price">$${car.price}</p>

      <div class="actions">
        ${car.type === "rent" ? `<button onclick="openAction('rent','${car.brand} ${car.model}')">Rent</button>` : ""}
        ${car.type === "sale" ? `<button onclick="openAction('buy','${car.brand} ${car.model}')">Buy</button>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

// ===============================
// ACTION MODAL
// ===============================
function openAction(type, name) {
  if (!localStorage.token) {
    openLogin();
    return;
  }

  currentAction = { type, name };

  document.getElementById("actionTitle").innerText =
    type === "rent" ? "Rent car" : "Buy car";

  document.getElementById("actionText").innerText =
    `${type === "rent" ? "Renting" : "Buying"} ${name}`;

  document.getElementById("actionModal").style.display = "flex";
}

function confirmAction() {
  alert("Request sent successfully");
  closeModals();
}

function closeModals(e) {
  if (e && e.target.className !== "modal") return;
  document.getElementById("actionModal").style.display = "none";
}

// ===============================
// AUTH MODALS
// ===============================
function openLogin() {
  closeAuth();
  document.getElementById("loginModal").style.display = "flex";
}

function openRegister() {
  closeAuth();
  document.getElementById("registerModal").style.display = "flex";
}

function closeAuth() {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("registerModal").style.display = "none";
}

// ===============================
// EMAIL VALIDATION
// ===============================
function validEmail(email) {
  const basic = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!basic.test(email)) return false;

  const blockedDomains = [
    "gmai.com",
    "gmial.com",
    "gmail.con",
    "hotmial.com",
    "yaho.com"
  ];

  const domain = email.split("@")[1].toLowerCase();
  if (blockedDomains.includes(domain)) return false;

  return true;
}


// ===============================
// LOGIN
// ===============================
async function login() {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!validEmail(email)) {
    alert("Invalid email format");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  localStorage.token = data.token;
  closeAuth();
}

// ===============================
// REGISTER
// ===============================
async function register() {
  const name = regName.value.trim();
  const email = regEmail.value.trim();
  const password = regPassword.value.trim();

  if (name.length < 2) {
    alert("Name too short");
    return;
  }

  if (!validEmail(email)) {
    alert("Invalid email format");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  closeAuth();
}

// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("token");
  location.reload();
}