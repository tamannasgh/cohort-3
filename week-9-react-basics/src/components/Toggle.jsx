import { useState } from "react";
function Toggle(){
    const [msg, setMsg] = useState(true);
    return <div>
        <h2>msg is : {msg ? "yes" : "no"}</h2>
        <button onClick={()=>setMsg(!msg)}>Click to change.</button>
    </div>
}

export default Toggle;