const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
title :{type:String, unique:true,},
author:{type:String, unique:false,},
subject:{type:String, unique:false,},
article:{type:String, unique:false,},
objectId:{type:number, unique:true,}
});

module.exports = mongoose.model('Product', BlogSchema);