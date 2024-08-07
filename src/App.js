import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import ChatApp from "./pages/ChatApp";
import AppState from "./context/AppState";
function App() {
  document.title="ChatApp";
  return (
    <AppState>
      <Router>
        <Routes>
          <Route path="/chatapp" element={<ChatApp />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </Router>{" "}
    </AppState>
  );
}

export default App;
