import { useState, useEffect } from "react";
import Account from "./Account";
import Add from "./Add";
import Properties from "./Properties";
import $ from "jquery";
const tab = ["Account", "Add", "Properties"];

export default function Profil() {
  const [component, setComponent] = useState(0);

  useEffect(() => {
    $("#0").addClass("active");
  }, []);

  const showComponent = (index) => {
    setComponent(index);
    $(".named").removeClass("active");
    if ($("#" + index).hasClass("active")) {
      $("#" + index).removeClass("active");
    } else {
      $("#" + index).addClass("active");
    }
  };

  return (
    <div className="flex flex-row pt-36 max-w-6xl mx-auto">
      <div className="w-1/4 max-w-xs p-5">
        {tab.map((item, index) => (
          <p
            id={index}
            className="cursor-pointer p-5 text-left  hover:text-white rounded-md my-2 text-white named"
            key={index}
            onClick={() => showComponent(index)}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="p-5 m-2 w-3/4">
        {component === 0 && <Account />}
        {component === 1 && <Add />}
        {component === 2 && <Properties />}
      </div>
    </div>
  );
}
