import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDoctorById,
  updateDoctor
} from "../services/doctorService";
import {
  getSpecializations
} from "../services/specializationService";
import {
  updateDoctorSpec
} from "../services/doctorSpecService";
import API from "../services/api";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [specs, setSpecs] = useState([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  //  fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // doctor
        const docRes = await getDoctorById(id);
        setName(docRes.data.name);

        // specs list
        const specRes = await getSpecializations();
        setSpecs(specRes.data);

        // current specialization
        const specMap = await API.get(`/doctor-specialization/${id}`);
        if (specMap.data.length > 0) {
          setCode(specMap.data[0].specializationCode);
        }

      } catch {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, [id]);

  //  submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !code) {
      setError("All fields required");
      return;
    }

    try {
      // update doctor
      await updateDoctor(id, { name });

      // update specialization
      await updateDoctorSpec({
        doctorId: id,
        specializationCode: code
      });

      navigate("/doctors");

    } catch {
      setError("Update failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-3">Edit Doctor</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Specialization */}
          <select
            className="form-control mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          >
            <option value="">Select Specialization</option>
            {specs.map((s) => (
              <option key={s._id} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="d-flex justify-content-between">
            <button className="btn btn-warning">
              Update
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/doctors")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

export default EditDoctor;