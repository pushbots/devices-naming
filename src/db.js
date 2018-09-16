const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let mongooseURI;
// If there's no user, remove it from URI
if (process.env.DB_USERNAME === "") {
  mongooseURI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
    process.env.DB_DATABASE
  }`;
} else {
  mongooseURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
}
mongoose.connect(
  mongooseURI,
  {
    useNewUrlParser: true
  },
  error => {
    console.log(error);
  }
);

module.exports = {
  mongoose
};
