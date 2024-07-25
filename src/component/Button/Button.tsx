import "./Button.css";

const Button = (props: any) => {
  return (
    <div
      className={
        (props.type == "light" ? "custom-btns-light" : "custom-btns-dark") +
        " py-2 px-4 btn rounded-0 " +
        props.class
      }
    >
      {props.text}
    </div>
  );
};

export default Button;
