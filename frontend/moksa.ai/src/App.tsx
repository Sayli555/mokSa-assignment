import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LiveTable from './components/LiveTable'
import HistoryTable from './components/HistoryTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <h1>Customer Tracker Dashboard</h1>
      <LiveTable />
      <HistoryTable />
      
     
    </div>
  )
}

export default App
