
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'customer-tracker',
  brokers: ['localhost:9092'], 
});

const topic = 'customer-data';

export const consumer = kafka.consumer({ groupId: 'dashboard-group' });

export const startKafkaConsumer = async (pushToMemory: (msg: any) => void) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();
      if (value) {
        const data = JSON.parse(value);
        pushToMemory(data);
      }
    },
  });
};
