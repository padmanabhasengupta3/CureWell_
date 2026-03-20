import { useEffect, useState } from "react";
import API from "../services/api";
import { deleteDoctor } from "../services/doctorService";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // fetch doctors
  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors/full");
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      fetchDoctors();
    } catch (err) {
      console.log("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Doctors</h2>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Surgery</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td>{doc._id.slice(-5)}</td>
              <td>{doc.name}</td>
              <td>{doc.specialization}</td>
              <td>{doc.hasSurgery ? "Yes" : "No"}</td>

              <td>
                {/* ✅ EDIT BUTTON */}
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit-doctor/${doc._id}`)}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;