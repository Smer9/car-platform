const Car = require("../models/Car");

exports.getCars = async (req, res) => {
  res.json(await Car.find());
};

exports.addCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.status(201).json(car);
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
