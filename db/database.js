const mongoose = require("mongoose");

//* Connection db mongo
module.exports = {
  init: () => {
    mongoose
      .connect("mongodb://127.0.0.1:27017/wilderdb", {
        autoIndex: true,
      })
      .then(() => console.log("Connected to database"))
      .catch((err) => console.log(err));
  },

  debug: () => {
    //? Debug
    mongoose.set("debug", true);
  },
};
