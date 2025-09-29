import { HashRouter, Routes, Route } from "react-router-dom";

//componets
import Login from "./pages/Login/Login";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
