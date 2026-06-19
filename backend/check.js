const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const all = await Project.find();
  console.log('Total projects:', all.length);
  console.log(JSON.stringify(all, null, 2));
  mongoose.connection.close();
});