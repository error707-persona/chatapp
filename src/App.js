import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import ChatApp from "./pages/ChatApp";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chatapp" element={<ChatApp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
