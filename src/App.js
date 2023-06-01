import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AllUsers from "./scenes/allUsers/AllUsers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<AllUsers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
