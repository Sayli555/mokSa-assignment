// frontend/src/HistoryTable.tsx
import React, { useEffect, useState } from 'react';
import { fetchHistory } from '../Api/api';

export default function HistoryTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchHistory().then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>History Table (Last 24 hrs)</h2>
      <table>
        <thead>
          <tr>
            <th>Hour</th>
            <th>In</th>
            <th>Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={i}>
              <td>{entry.hour}</td>
              <td>{entry.in}</td>
              <td>{entry.out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
