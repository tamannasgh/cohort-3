import { useRef, useEffect } from "react";
function usePrev(value) {
  const ref = useRef(null);
  console.log("1st this will run with value: " + value);

  useEffect(() => {
    console.log("3rd this will run and update the value: " + value);

    ref.current = value;
  }, [value]);

  console.log("2nd this will run and return (without updating) value: " + ref.current);

  return ref.current;
}

export default usePrev;