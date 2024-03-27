// const production = process.env.PROD;
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin:EGKQOuCv0kDhEJMa@users.bmogjox.mongodb.net/rentomojo')
module.exports = mongoose;