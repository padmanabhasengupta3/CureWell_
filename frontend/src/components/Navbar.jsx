import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CureWell</Link>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/doctors">Doctors</Link>
          <Link className="nav-link" to="/add-doctor">Add Doctor</Link>
          <Link className="nav-link" to="/specializations">Specializations</Link>
          <Link className="nav-link" to="/surgeries">Surgeries</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;