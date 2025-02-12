import {useState, useEffect} from "react";

const Notification = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const notif = setInterval(() => {
      setCount(count => count + 1);
      console.log("inside notifications");
    }, 1000);

    return () => {
      clearInterval(notif);
    }
  }, []);

  

  return (
    <>
    <h3>Notification: {count}</h3>
    {/* <button onClick={()=>setCount(count +1)}>increase count</button> */}
    </>
  )
}

export default Notification