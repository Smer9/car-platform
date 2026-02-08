const mongoose = require("mongoose");
require("dotenv").config();

const Car = require("./models/Car");

const cars = [
  {
    brand: "Toyota",
    model: "Camry",
    year: 2021,
    price: 90,
    type: "rent",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/500px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg",
    description: "Reliable sedan for daily rent"
  },
  {
    brand: "BMW",
    model: "3 Series",
    year: 2020,
    price: 120,
    type: "rent",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/2019_BMW_318d_SE_Automatic_2.0_Front.jpg/330px-2019_BMW_318d_SE_Automatic_2.0_Front.jpg",
    description: "Premium German sedan"
  },
  {
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 130,
    type: "rent",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_W206_IMG_6380.jpg/330px-Mercedes-Benz_W206_IMG_6380.jpg",
    description: "Luxury and comfort"
  },
  {
    brand: "Tesla",
    model: "Model 3",
    year: 2022,
    price: 140,
    type: "rent",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/330px-2019_Tesla_Model_3_Performance_AWD_Front.jpg",
    description: "Electric future car"
  },
  {
    brand: "Ford",
    model: "Mustang",
    year: 2021,
    price: 150,
    type: "rent",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2018_Ford_Mustang_GT_5.0.jpg/330px-2018_Ford_Mustang_GT_5.0.jpg",
    description: "American muscle car"
  },

  // SALE CARS
  {
    brand: "Toyota",
    model: "Land Cruiser",
    year: 2019,
    price: 45000,
    type: "sale",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/2021_Toyota_Land_Cruiser_300_3.4_ZX_%28Colombia%29_front_view_04.png/330px-2021_Toyota_Land_Cruiser_300_3.4_ZX_%28Colombia%29_front_view_04.png",
    description: "Legendary SUV for any road"
  },
  {
    brand: "BMW",
    model: "X5",
    year: 2020,
    price: 52000,
    type: "sale",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/2024_BMW_X5.jpg/330px-2024_BMW_X5.jpg",
    description: "Luxury family SUV"
  },
  {
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2021,
    price: 48000,
    type: "sale",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/2019_Mercedes-Benz_E220d_SE_Automatic_2.0_Front.jpg/250px-2019_Mercedes-Benz_E220d_SE_Automatic_2.0_Front.jpg",
    description: "Business class sedan"
  },
  {
    brand: "Audi",
    model: "A6",
    year: 2020,
    price: 47000,
    type: "sale",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Audi_A6_2018_%2844686505662%29.jpg/330px-Audi_A6_2018_%2844686505662%29.jpg",
    description: "Modern executive sedan"
  },
  {
    brand: "Tesla",
    model: "Model Y",
    year: 2022,
    price: 55000,
    type: "sale",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tesla_Model_Y_1X7A6211.jpg/330px-Tesla_Model_Y_1X7A6211.jpg",
    description: "Electric SUV"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Car.deleteMany();
    await Car.insertMany(cars);

    console.log("✅ Cars seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
