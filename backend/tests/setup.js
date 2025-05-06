const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nirmaan-test');
});

afterAll(async () => {
  await mongoose.connection.close();
}); 