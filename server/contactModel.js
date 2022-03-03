const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter a first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter a last name'],
  },
  age: {
    type: Number,
    min: [12, 'Age must be more than 12'],
    max: [120, 'Come on! No one can be THAT old...'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email address'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  phoneNumber: {
    type: String,
    validate: [validator.isMobilePhone, 'Please enter a valid phone number'],
  },
  gender: {
    type: String,
    required: [true, 'Please pick a gender (or the closest gender to yours)'],
    enum: {
      values: ['M', 'F', 'X'],
    },
  },
  city: String,
  image: {
    type: String,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
