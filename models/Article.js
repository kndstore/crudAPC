const mongoose=require("mongoose");

const Schema=mongoose.Schema

const articleSchema=new Schema({
reference:String,
designation:String,
n_serie:String,
qte:Number,
position:String,
etat:String,
service:String,
section:String,
date:Date

})

const Article=mongoose.model("Article",articleSchema)

module.exports=Article