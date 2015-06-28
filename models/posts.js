var mongoose = require('mongoose');
var schema = mongoose.Schema({
  title: {type: String, default: "" },
  body: {type: String, default: "" },
  author: Number
});


var Post  = mongoose.model("posts",schema);
module.exports=Post;