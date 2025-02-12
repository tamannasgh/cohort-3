import { useState, createContext, useContext } from "react";

const BulbContext = createContext();

function App() {
  return <div>
    <LightBulb />
  </div>
}

function BulbContextProvider({ children }) {
  const [isBulbOn, setIsBulbOn] = useState(true);
  return <BulbContext value={{ isBulbOn, setIsBulbOn }}>
    {children}
  </BulbContext>
}

function LightBulb() {
  return <BulbContextProvider>
    <Bulb />
    <ToggleBulb />
  </BulbContextProvider>
}

function Bulb() {
  const { isBulbOn } = useContext(BulbContext);
  return <h1>{isBulbOn ? "bulb on" : "bulb off"}</h1>
}

function ToggleBulb() {
  const { setIsBulbOn } = useContext(BulbContext);
  return <button onClick={() => setIsBulbOn(prevBulb => !prevBulb)}>toggle bulb</button>
}

export default App;