const express = require('express');
const { Kafka,Partitioners } = require('kafkajs')
const ip=require('ip')
const host =  ip.address()




const app = express();

app.use(express.json());

const port =  3001;

app.listen(port, () => {
  console.log(`Products Service at ${port}`);
});


app.post('/products/buy', async  (req, res) => {
  



  //let order;

//   channel.sendToQueue(
//     'ORDER',
//     Buffer.from(
//       JSON.stringify({
//         name,
//         price
        
//       })
//     )
//   );
//   await channel.consume('PRODUCT', data => {
//     console.log(data,"lllllllllllllllllll");
//     order = JSON.parse(data.content);

//   });
//   res.json(order)
//   //res.status(200).json(product);

const kafka = new Kafka({
    clientId: 'sample-kafka-client',
    brokers: ['kafka:9092'],
    groupId: 'test-group',
    
  });
  
  const topic = 'test'

  const producer= kafka.producer()
  
 try{
const productDate=req.body

    const productProducer= async(productData,topic)=>{
        console.log(productData,topic);
        if(!productData){
            return 
        }
        await producer.connect(console.log("conneted to produce"))
const messagePayload={
    data:productData
}
 
await producer.send({
    topic:topic,
    messages:[{value:JSON.stringify(messagePayload)}]
})



    }

productProducer(productDate,topic)

 }catch(err){
    console.log(err);
 }

 finally{
    await producer.disconnect()
 }

});


