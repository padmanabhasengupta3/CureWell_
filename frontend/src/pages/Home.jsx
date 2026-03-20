import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-4">

      {/* Hero Section */}
      <div className="text-center p-5 mb-4 bg-light rounded">
        <h1 className="display-5 fw-bold">CureWell Hospital Management System</h1>
        <p className="lead">
          Manage doctors, specializations, and surgeries efficiently.
        </p>
      </div>

      {/* Features Section */}
      <div className="row text-center">

        {/* Doctors */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Doctors</h5>
              <p className="card-text">
                View and manage all doctors in the system.
              </p>
              <Link to="/doctors" className="btn btn-primary">
                View Doctors
              </Link>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Specializations</h5>
              <p className="card-text">
                Browse available medical specializations.
              </p>
              <Link to="/specializations" className="btn btn-success">
                View Specializations
              </Link>
            </div>
          </div>
        </div>

        {/* Surgeries */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Surgeries</h5>
              <p className="card-text">
                Monitor and update today's surgeries.
              </p>
              <Link to="/surgeries" className="btn btn-danger">
                View Surgeries
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Section */}
      <div className="text-center mt-5">
        <hr />
        <p className="text-muted">
          CureWell © 2026 | Hospital Management System
        </p>
      </div>

    </div>
  );
}

export default Home;