const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

if (!carId) {
  document.body.innerHTML = "<h2>Car not found</h2>";
}

loadCar();

async function loadCar() {
  try {
    const res = await fetch("/api/cars");
    const cars = await res.json();
    const car = cars.find(c => c._id === carId);

    if (!car) {
      document.body.innerHTML = "<h2>Car not found</h2>";
      return;
    }

    renderCar(car);
  } catch {
    document.body.innerHTML = "<h2>Error loading car</h2>";
  }
}

function renderCar(car) {
  const div = document.getElementById("car");

  div.innerHTML = `
    <img src="${car.image}" style="width:100%;max-height:400px;object-fit:cover;border-radius:8px">

    <h1 style="margin-top:20px">
      ${car.brand} ${car.model} (${car.year})
    </h1>

    <h3>$${car.price}</h3>

    <p style="margin-top:15px">
      ${car.description || "No description available."}
    </p>

    <hr style="margin:30px 0">

    <h2>Showroom</h2>
    <p>
      This car is available in our official showroom.
      You can inspect it personally or request additional photos.
    </p>

    <h2>Wiki</h2>
    <p>
      ${car.brand} ${car.model} is a popular model known for reliability,
      comfort and performance. It is widely used across many countries.
    </p>

    <div style="margin-top:30px;display:flex;gap:15px">
      ${
        car.type === "rent"
          ? `<button onclick="action('rent')">Rent this car</button>`
          : ""
      }
      ${
        car.type === "sale"
          ? `<button onclick="action('buy')">Buy this car</button>`
          : ""
      }
    </div>
  `;
}

function action(type) {
  if (!localStorage.token) {
    alert("Please login first");
    return;
  }

  alert(
    type === "rent"
      ? "Rental request sent"
      : "Purchase request sent"
  );
}
