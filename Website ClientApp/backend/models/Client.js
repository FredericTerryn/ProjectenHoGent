let mongoose = require('mongoose');
 
let ClientSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name:String,
  email:String,
  streetname:String,
  streetnumber:String,
  phone:String,
  gender:String,
  birth:String,
  username:String
});
 
mongoose.model('Client', ClientSchema);
