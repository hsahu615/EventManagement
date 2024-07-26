import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Events from "./pages/Events/Events";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup/Signup";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Layout from "./Layout";
import RequireAuth from "./component/RequireAuth";
import Unauthorized from "./Unauthorized";
import BookEvent from "./pages/BookEvent/BookEvent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="create-event" element={<CreateEvent />} />
        </Route>

        {/* Common Secured Routes */}
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="live-events" element={<Events />} />
          <Route path="book-event/:eventId" element={<BookEvent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
