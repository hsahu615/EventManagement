import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Events from "./pages/Events/Events";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup/Signup";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Layout from "./Layout";
import RequireAuth from "./states/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="create-event" element={<CreateEvent />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="book-event" element={<Events />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
