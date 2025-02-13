import {useSelector, useDispatch} from "react-redux"
import {incCount, decCount, makeCount} from "./store/slices/counterSlice";
import {useState} from "react";

function App() {
  const count = useSelector(store => store.counter);
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);

  return (
    <>
      <h1>count is {count}</h1>
      <button onClick={() => dispatch(incCount())} >Increase</button>
      <button onClick={() => dispatch(decCount())} >Decrease</button>
      <input type="number" value={num} onChange={(e) => setNum(e.target.value)} />
      <button onClick={() => dispatch(makeCount(num))}>change no to this</button>
    </>
  )
}

export default App
