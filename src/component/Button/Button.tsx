import React from "react";
import {
  BACKGROUND_DARK,
  BACKGROUND_LIGHT,
  TEXT_DARK,
  TEXT_LIGHT,
} from "../../constant/Constant";

const Button = (props: any) => {
  return (
    <div
      style={{
        backgroundColor:
          props.type == "light" ? BACKGROUND_LIGHT : BACKGROUND_DARK,
        color: props.type == "light" ? TEXT_DARK : TEXT_LIGHT,
        border:
          props.type == "light" ? "1px solid black" : "1px solid transparent",
      }}
      className="py-2 px-4 btn rounded-0"
    >
      {props.text}
    </div>
  );
};

export default Button;
