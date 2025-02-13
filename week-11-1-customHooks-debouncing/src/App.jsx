import {useState, useMemo} from "react";
function App() {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  const memoizedValue = useMemo(() => {
    for(let i = 0; i < 1000000000; i++) {}
    console.log("calculating", num);
    return num * 2;
  }, [num]);


  return (
    <>
      <button onClick={() => setCount(count + 1)}>increase {count}</button>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)} />
      <p>double of {num} is {memoizedValue}</p>
    </>
  )
}

export default App;
