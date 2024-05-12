const dontenv = require("dotenv");
dontenv.config();

const mongoose = require("mongoose");
const { Schema } = mongoose;
let database;

const contactSchema = new Schema({
  firstName: { type: String, required: [true, "First Name Required"] },
  lastName: { type: String, required: [true, "Last Name Required"] },
  email: {
    type: String,
    required: [true, "Email Required"],
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required"],
    match: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"]
  },
  relation: {
    type: String,
    required: [true, "Relation is required"]
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'addresses' },
},{versionKey: false});

const addressSchema = new Schema({
  street1: { type: String, required: [true, "street1 Required"] },
  street2: { type: String },
  city: { type: String, required: [true, "City Required"] },
  state: { type: String, required: [true, "State Required"] },
  country: { type: String, required: [true, "Country Required"] },
  zip: { type: String, required: [true, "Zip Code Required"] },
},{versionKey: false});

let contactModel;
let addressModel;

const initDb = async (callback) => {
  if (database) {
    console.warn("Trying to init DB again!");
    return callback(null, database);
  }

  database = await mongoose.connect(process.env.MONGODB_URL);
  contactModel = database.model("contact", contactSchema, "contact")
  addressModel = database.model("addresses", addressSchema, "addresses");
  return callback(null, database);
};

const getDatabase = () => {
  if (!database) {
    throw "Db has not been initialized. Please call init first.";
  }
  return database;
};

const getModel = (name) => {
  if (name == "contact"){
    return contactModel;
  }else if(name == "addresses"){
    return addressModel;
  }else{
    throw Error("No model found");
  }
};

module.exports = {
  initDb,
  getDatabase,
  getModel,
};
