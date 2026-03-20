import { useEffect, useState } from "react";
import API from "../services/api";
import { addSpecialization } from "../services/specializationService";

function Specializations() {
  const [data, setData] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // fetch data
  const fetchData = async () => {
    try {
      const res = await API.get("/specializations/full");
      setData(res.data);
    } catch {
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add specialization
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !name) {
      setError("All fields required");
      return;
    }

    try {
      await addSpecialization({ code, name });

      setCode("");
      setName("");
      setError("");

      fetchData(); // refresh table
    } catch {
      setError("Failed to add specialization");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Specializations</h2>

      {/*  ADD FORM */}
      <div className="card p-3 mb-4">
        <h5>Add Specialization</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/*  TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>No. of Doctors</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((spec, index) => (
            <tr key={index}>
              <td>{spec.code}</td>
              <td>{spec.name}</td>
              <td>{spec.doctors.length}</td>

              <td>
                <button
                  className="btn btn-info btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#doctorModal"
                  onClick={() => setSelectedDoctors(spec.doctors)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  MODAL */}
      <div className="modal fade" id="doctorModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Doctors</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {selectedDoctors.length > 0 ? (
                <ul className="list-group">
                  {selectedDoctors.map((doc, i) => (
                    <li key={i} className="list-group-item">
                      {doc}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No doctors assigned</p>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Specializations;