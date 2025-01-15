import "./App.css";
import Create from "./components/Create";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
}

export default App;
