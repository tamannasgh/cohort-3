import {useState, useRef} from "react";
import Button from "./Button";

function OTP({boxesNo}) {

  const [disabled, setDisabled] = useState(true);
  const inputRefs = useRef([Array(boxesNo).fill(0)]);

  return <div className="m-5">
    {Array(boxesNo).fill(0).map((box, i) => <SubOtp key={i}
      refr={(inp) => {
        inputRefs.current[i] = inp;
      }}
      onDone={() => {
        if(i == boxesNo - 1) {
          setDisabled(false);
        }
        if(i < boxesNo - 1) {
          inputRefs.current[i + 1].focus();
        }
      }}
      onBack={() => {
        if(i > 0) {
          inputRefs.current[i - 1].focus();
        }
      }}
      setDisabled={setDisabled}
    />)}
    <Button extraClasses="block m-auto my-5" onClick={
      () => {alert("completed");}
    }
      isDisabled={disabled}
    >Verify
    </Button>
  </div>;
}

function SubOtp({refr, onDone, onBack, setDisabled}) {
  const [value, setValue] = useState("");

  function handleOnKeyDown(e) {
    if(e.key === "Backspace") {
      if(value !== "") {
        setValue("");
        setDisabled(true);
      } else {
        onBack(e);
      }
    }

    if(Number(e.key) || e.key === "0") {
      if(value !== "") {
        onDone();
      } else {
        setValue(e.key);
        onDone(e);
      }
    }
  }

  return <input type="text" ref={refr} value={value} onKeyDown={handleOnKeyDown} className="w-[32px] h-[40px] rounded-md m-1 bg-secondary-bg outline-none p-2 text-center" />;


}

export default OTP;