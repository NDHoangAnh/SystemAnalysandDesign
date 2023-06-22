import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllUsers from "./scenes/allUsers/AllUsers";

import Login from "./scenes/login/Login";
import { route } from "./configs/route";
import Register from "./scenes/register/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="" element={<AllUsers />}></Route> */}
          <Route path={route.LOGIN} element={<Login />}></Route>
          <Route path={route.REGISTER} element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
