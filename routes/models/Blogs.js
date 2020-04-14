const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
title :{type:String, unique:false,},
author:{type:String, unique:false,},
subject:{type:String, unique:false,},
article:{type:String, unique:false,},
});

module.exports = mongoose.model('Blog', BlogSchema);