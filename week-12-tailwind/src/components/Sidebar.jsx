import {useState} from "react";
import Toggle from "../icons/Toggle";

const Sidebar = ({className}) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${className} `}>
      <span onClick={() => alert(1)}>
        <Toggle className="size-10 m-3" />
      </span>

      <h1>Sidebar</h1>
    </div>
  );
};

export default Sidebar;