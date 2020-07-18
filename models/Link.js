//связано с routes
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  //откуда идет ссылка
  from: { type: String, required: true },
  //куда будет вести данная ссылка
  to: { type: String, requred: true },
  //когда ссылка была создана
  data: { type: Date, default: Date.now },
  //простая аналитика, сколько раз кликнули
  clicks: { type: Number, default: 0 },
  //связка ссылок с поль-лем кот-й её создал
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", schema);
