const express = require("express");
const app = express();
const kafkaproducer = require("./kafkaproducer").kafkaservice;



app.get("/send", function(req, res){
    kafkaproducer.sendRecord();
    res.status(200).send({msg : "kafka produced a message"})
})  



app.listen(4000, function(){
    console.log("-----server running on port 4000-----")
})