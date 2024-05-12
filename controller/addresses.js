const mongoose = require("../db/connect");
const dotenv = require("dotenv").config();
const getModel = mongoose.getModel;

const Address = getModel("addresses");

//GET calls
const getAll = async (req, res) => {
  const result = await Address.find();
  if (result.length > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json("Malformed Request, please check contents and try again.");
  }
};

const getID = async (req, res) => {
  const AddressID = req.params.id;
  try {
    const result = await Address.findById(AddressID);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json("Invalid ID, please enter a correct ID.");
  }
};

//POST call
const createAddress = async (req, res) => {
  try {
    const response = await Address.create(req.body);
    res.status(200).send(response);
  } catch (err) {
    res
      .status(404)
      .json(
        err.errors || "Malformed request. Please review contents and try again."
      );
  }
};

//PUT call
const updateAddress = async (req, res) => {
  const AddressID = req.params.id;
  try {
    const update = req.body;
    const response = await Address.findByIdAndUpdate(AddressID, update);
    res.status(200).send(response);
  } catch (err) {
    res
      .status(404)
      .json(
        err.errors || "Malformed request. Please review contents and try again."
      );
  }
};

//DELETE call
const deleteAddress = async (req, res) => {
  const AddressID = req.params.id;
  try {
    const response = await Address.findByIdAndDelete(AddressID);
    res.status(200).json("Address Deleted");
  } catch (err) {
    res
      .status(404)
      .json(
        err.errors || "Malformed request. Please review contents and try again."
      );
  }
};

module.exports = {
  getAll,
  getID,
  createAddress,
  updateAddress,
  deleteAddress,
};
