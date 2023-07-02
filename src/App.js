import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./scenes/login/Login";
import { route } from "./configs/route";
import Register from "./scenes/register/Register";
import Home from "./scenes/home/Home";
import HomeUser from "./scenes/home/HomeUser";
import HomeAdmin from "./scenes/home/HomeAdmin";
import HomePage from "./scenes/home/HomePage";
import ForgotPassword from "./scenes/forgotPassword/ForgotPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={route.LOGIN} element={<Login />}></Route>
          <Route path={route.REGISTER} element={<Register />}></Route>
          <Route path={route.HOMEPAGE} element={<Home />}></Route>
          <Route path={route.USER} element={<HomeUser />}></Route>
          <Route path={route.ADMIN} element={<HomeAdmin />}></Route>
          <Route path={route.HOME} element={<HomePage />}></Route>
          <Route
            path={route.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
