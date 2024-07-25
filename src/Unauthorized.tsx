import { useNavigate } from "react-router-dom";
import Button from "./component/Button/Button";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section
      className="row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-4">
        <h1 className="text-center">Unauthorized</h1>
        <p className="text-center">
          You do not have access to the requested page.
        </p>
        <div className="flexGrow text-center">
          <span onClick={goBack}>
            <Button text="Go Back" type="dark" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Unauthorized;
