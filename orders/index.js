const express = require('express');
const { Kafka} = require('kafkajs')

const kafka = new Kafka({
    clientId: 'sample-kafka-client',
    brokers: ['kafka:9092'],
    groupId: 'test-group',
})

const topic = 'test'
const consumer = kafka.consumer({
  groupId: 'test-group'
})

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ message }) => {
        console.log(message);
      try {
        const jsonObj = JSON.parse(message.value.toString())
       
        console.log(jsonObj,"///////");
         
      } catch (error) {
        console.log('err=', error)
      }
    }
  })
}



run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

const app = express();

app.use(express.json());

const port = 3002;

app.listen(port, () => {
  console.log(`Orders Service at ${port}`);
});
