import express from 'express';
import cors from 'cors';
import { startKafkaConsumer } from './kafka';

const app = express();
const PORT = 8080;

app.use(cors());

let liveData: any[] = [];
let historyData: Map<string, { in: number; out: number }> = new Map();

function aggregateHistory(data: any) {
  const now = new Date();
  const hourKey = now.getHours().toString().padStart(2, '0'); // e.g., "09", "15"
  const previous = historyData.get(hourKey) || { in: 0, out: 0 };

  historyData.set(hourKey, {
    in: previous.in + data.customers_in,
    out: previous.out + data.customers_out,
  });
}

startKafkaConsumer((msg) => {
  const data = {
    ...msg,
    received_at: new Date().toISOString(),
  };
  liveData.unshift(data);
  if (liveData.length > 50) liveData.pop();

  aggregateHistory(msg);
});

app.get('/live', (_req, res) => {
  res.json(liveData);
});

app.get('/history', (_req, res) => {
  const result = Array.from(historyData.entries()).map(([hour, data]) => ({
    hour,
    ...data,
  }));
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
