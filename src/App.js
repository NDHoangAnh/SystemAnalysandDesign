import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./scenes/login/Login";
import { route } from "./configs/route";
import Register from "./scenes/register/Register";
import Home from "./scenes/home/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={route.LOGIN} element={<Login />}></Route>
          <Route path={route.REGISTER} element={<Register />}></Route>
          <Route path={route.HOMEPAGE} element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
