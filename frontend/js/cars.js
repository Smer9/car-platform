fetch("/api/cars")
  .then(res => res.json())
  .then(cars => {
    const container = document.getElementById("cars");

    cars.forEach(c => {
      const div = document.createElement("div");

      div.innerHTML = `
        <img src="${c.image}" width="300">
        <h3>${c.brand} ${c.model}</h3>
        <p>${c.price}$</p>
        <a href="car.html?id=${c._id}">View details</a>
        <hr>
      `;

      container.appendChild(div);
    });
  });
