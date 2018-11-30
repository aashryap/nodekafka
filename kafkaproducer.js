const kafka = require("kafka-node");
const uuid = require("uuid");



const client = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout : 300,
    spinDelay : 100,
    retries : 2
})
// client.refreshMetadata()

const producer = new kafka.HighLevelProducer(client);
producer.on("ready", function(){
    console.log("kafka producer is ready");
})



producer.on("error", function(error){
    console.log("error in kafka------ ", error);
})


const kafkaService =  {
    
    sendRecord : () => {
        
        let type = "TYPE";
        let message  = "MESSAGE";
        let data = {data : "THIS IS SOME DUMMY DATA"};
       
        const event = {
            id : uuid.v4(),
            timestamp : Date.now(),
            message :  message,
            data : data,
            type : type
        }

        const buffer = new Buffer(JSON.stringify(event));
        const record = [{
            topic : "webevents.dev",
            messages : buffer,
            attributes : 1
        }]

        producer.send(record, function(error, result){
            console.info('Sent payload to Kafka: ', record);
            if (error) {
              console.error(error);
            } else {
              var formattedResult = result[0];
              console.log('result: ', result)
            }
        });
    }
}



module.exports.kafkaservice = kafkaService;