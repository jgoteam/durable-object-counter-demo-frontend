import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [counterLog, setCounterLog] = useState({
    counterValue: null,
    logEntries: [],
  });

  const SOCKET_URL = `ws://localhost:8787/websocket`;
  const socket = new WebSocket(SOCKET_URL);

  socket.onmessage = (e) => {
    const jsonData = JSON.parse(e.data);
    setCounterLog(jsonData);
  };

  useEffect(() => {
    socket.onopen = (e) => {
      console.log(`WebSocket connection established`);
      socket.send("read");
    };
  }, []);

  const handleIncrementClick = (e) => {
    e.preventDefault();

    socket.send("increment");
  };

  const handleDecrementClick = (e) => {
    e.preventDefault();

    socket.send("decrement");
  };

  const handleClearLogClick = (e) => {
    e.preventDefault();

    socket.send("clear logs");
  };

  return (
    <>
      <h2>Current Counter Value:</h2>
      <h2>{counterLog.counterValue}</h2>
      <div className="card">
        <button onClick={handleIncrementClick}>Increment Counter Value</button>
        <pre></pre>
        <button onClick={handleDecrementClick}>Decrement Counter Value</button>
      </div>
      <div className="card">
        <h2>Increment/Decrement Click Log</h2>
        <ul>
          {counterLog.logEntries.map((entry, index) => {
            return <li key={index}>{entry}</li>;
          })}
        </ul>
        <button onClick={handleClearLogClick}>Clear Logs</button>
      </div>
    </>
  );
}

export default App;
