import {useState, useEffect} from "react";

function Todos(){
  const [todo, setTodo] = useState({});
  const [todoNo, setTodoNo] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function getTodo(){
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + todoNo);
      const todo = await res.json();
      setTodo(todo);
      setLoading(false);
    }
    getTodo();
  }, [todoNo]);

  return (
    <div>
      <button onClick={()=>setTodoNo(1)} style={{"color" : todoNo == 1 ? "red" : "black"}}>todo1</button>
      <button onClick={()=>setTodoNo(2)} style={{"color" : todoNo == 2 ? "red" : "black"}}>todo2</button>
      <button onClick={()=>setTodoNo(3)} style={{"color" : todoNo == 3 ? "red" : "black"}}>todo3</button>
      {loading ? <p>loading...</p> : <p>{todo.title}</p>}
    </div>
    
  );
}

export default Todos;