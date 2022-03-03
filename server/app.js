const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('./contactHandler');

const app = express();

dotenv.config({ path: './config.env' });

// CONNECT DATABASE
async function dbConnect() {
  const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );

  try {
    await mongoose.connect(DB);
    console.log('Connected to database!');
  } catch (err) {
    console.log('DB Connect: ', err);
  }
}

dbConnect();

// ROUTE API
app.use(express.json());

app.route('/api/contacts').get(getAllContacts).post(createContact);
app
  .route('/api/contacts/:id')
  .get(getContact)
  .patch(updateContact)
  .delete(deleteContact);

// CREATE SERVER
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
