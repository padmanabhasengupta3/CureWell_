import { useEffect, useState } from "react";
import { addDoctor } from "../services/doctorService";
import { getSpecializations } from "../services/specializationService";
import { assignSpecialization } from "../services/doctorSpecService";
import { useNavigate } from "react-router-dom";

function AddDoctor() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [specs, setSpecs] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // fetch specializations
  useEffect(() => {
    getSpecializations()
      .then(res => setSpecs(res.data))
      .catch(() => setError("Failed to load specializations"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !code) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      //  Step 1: Create doctor
      const res = await addDoctor({ name });

      // get doctor ID
      
      const doctorId = res.data._id;

      //  Step 2: Assign specialization
      await assignSpecialization({
        doctorId,
        specializationCode: code,
        specializationDate: new Date()
      });

      navigate("/doctors");

    } catch {
      setError("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="text-center mb-4">Add Doctor</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* Doctor Name */}
          <div className="mb-3">
            <label className="form-label">Doctor Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Specialization */}
          <div className="mb-3">
            <label className="form-label">Specialization</label>
            <select
              className="form-control"
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
          </div>

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Doctor"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default AddDoctor;