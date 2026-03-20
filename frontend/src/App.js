import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctors";
import Specializations from "./pages/Specializations";
import Surgeries from "./pages/Surgeries";
import ErrorPage from "./pages/ErrorPage";
import EditDoctors from "./pages/EditDoctors";
function App() {
  return (
    <Router>

      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/specializations" element={<Specializations />} />
        <Route path="/surgeries" element={<Surgeries />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/edit-doctor/:id" element={<EditDoctors />} />
      </Routes>

    </Router>
  );
}

export default App;