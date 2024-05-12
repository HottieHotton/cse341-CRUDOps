const mongoose = require("../db/connect");
const dotenv = require("dotenv").config();
const getModel = mongoose.getModel;

const Contact = getModel("contact");
const Address = getModel("addresses");

//GET calls
const getAll = async (req, res) => {
  const result = await Contact.find().populate("address").exec();
  if (result.length > 0) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } else {
    res
      .status(404)
      .json("Malformed Request, please check contents and try again.");
  }
};

const getGender = async (req, res) => {
  const param = req.params.filter;
  let returnList = [];
  const result = await Contact.find();
  res.setHeader("Content-Type", "application/json");
  result.forEach((contact) => {
    if (contact["gender"] == param.toUpperCase()) {
      returnList.push(contact);
    }
  });
  if (returnList != 0) {
    res.status(200).json(returnList);
  } else {
    res
      .status(404)
      .json("Malformed Request, please check contents and try again.");
  }
};

const getID = async (req, res) => {
  const contactID = req.params.id;
  try {
    const result = await Contact.findById(contactID);
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json("Invalid ID, please enter a correct ID.");
  }
};

//POST call
const createContact = async (req, res) => {
  try {
    const { contact, address } = req.body;
    const newAddress = await Address.create(address);
    contact.address = newAddress._id;
    const response = await Contact.create(contact);
    const populateContact = await Contact.findById(response._id)
      .populate("address")
      .exec();
    res.status(200).send(populateContact);
  } catch (err) {
    res
      .status(404)
      .json(
        err.errors || "Malformed request. Please review contents and try again."
      );
  }
};

//PUT call
const updateContact = async (req, res) => {
  const contactID = req.params.id;
  try {
    const { contact, address } = req.body;
    const getAddress = await Contact.findById(contactID);
    const updateAddress = getAddress.address.toString();
    const updatedAddress = await Address.findByIdAndUpdate(
      updateAddress,
      address
    );
    const updatedContact = await Contact.findByIdAndUpdate(contactID, contact);
    const populateContact = await Contact.findById(updatedContact._id)
      .populate("address")
      .exec();
    res.status(200).send(populateContact);
  } catch (err) {
    res.status(404).json(err.errors);
  }
};

//DELETE call
const deleteContact = async (req, res) => {
  try {
    const contactID = req.params.id;
    const getAddress = await Contact.findById(contactID);
    const addressID = getAddress.address.toString();
    const deleteContact = await Contact.findOneAndDelete(contactID);
    const deleteAddress = await Address.findOneAndDelete(addressID);
    res.status(200).json("Contact and Address deleted");
  } catch (err) {
    res
      .status(404)
      .json(
        response.error ||
          "Malformed request. Please review contents and try again."
      );
  }
};

module.exports = {
  getAll,
  getID,
  getGender,
  createContact,
  updateContact,
  deleteContact,
};
