import React, { useState } from "react";
import "./toggle.css";
import { Switch } from "antd";

function Toggle() {
  const [toggle, settoggle] = useState(false);
  const toggler = () => {
    toggle ? settoggle(false) : settoggle(true);
  };
  return (
    <div>
      <Switch onClick={toggler} />
      {toggle ? (
        <span>
          <br />
          Button is clicked
        </span>
      ) : (
        <span>
          {" "}
          <br />
          Button is not clicked
        </span>
      )}
    </div>
  );
}

export default Toggle;
