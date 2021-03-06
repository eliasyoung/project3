const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  avatar: { type: String },
  location: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [
    {
      icons: { type: String },
      name: { type: String },
      description: { type: String },
      tips: { type: String },
    },
  ],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
      description: { type: String },
    },
  ],
});

module.exports = mongoose.model("Hero", schema, "heroes");
