// frontend/src/LiveTable.tsx
import React, { useEffect, useState } from 'react';
import { fetchLive } from '../Api/api';

export default function LiveTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLive().then((res) => setData(res.data));
    }, 2000); // Poll every 2 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live Table</h2>
      <table>
        <thead>
          <tr>
            <th>Store ID</th>
            <th>In</th>
            <th>Out</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i}>
              <td>{entry.store_id}</td>
              <td>{entry.customers_in}</td>
              <td>{entry.customers_out}</td>
              <td>{entry.time_stamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
