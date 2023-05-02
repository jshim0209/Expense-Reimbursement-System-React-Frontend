import Employee from "./Screens/Employee";
import Home from "./Screens/Home";
import { Route, Routes } from "react-router-dom";
import Manager from "./Screens/Manager";
import Login from "./Screens/Login";

function App() {
  return (
    <div className="route-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </div>
  );
}

export default App;
