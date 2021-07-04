const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    //unable to find
    select: false,
    //use bcrypt encrypt passwd
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("AdminUser", schema);
