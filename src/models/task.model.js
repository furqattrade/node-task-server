const mongoose = require('mongoose');
const { Schema } = mongoose;
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: String },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
  }
},);

module.exports = mongoose.model('Task', taskSchema);
