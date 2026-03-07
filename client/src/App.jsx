import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NgoPage from "./pages/NgoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ngo" element={<NgoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
