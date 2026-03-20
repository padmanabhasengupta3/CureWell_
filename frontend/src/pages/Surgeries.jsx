import { useEffect, useState } from "react";
import {
  getTodaySurgeries,
  getSurgeries,
  addSurgery,
  updateSurgery //  NEW
} from "../services/surgeryService";
import { getDoctors } from "../services/doctorService"; 

function Surgeries() {
  const [surgeries, setSurgeries] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [view, setView] = useState("today");

  const [form, setForm] = useState({
    doctorId: "",
    surgeryDate: "",
    startTime: "",
    endTime: "",
    category: ""
  });

  const [editData, setEditData] = useState({
    id: "",
    startTime: "",
    endTime: ""
  });

  const [error, setError] = useState("");

  const fetchData = async (type = view) => {
    try {
      const s =
        type === "today"
          ? await getTodaySurgeries()
          : await getSurgeries();

      const d = await getDoctors();

      setSurgeries(s.data);
      setDoctors(d.data);
      setError("");
    } catch {
      setError("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData(view);
  }, [view]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startTime, endTime } = form;

    if (!form.doctorId || !form.category || !form.surgeryDate) {
      setError("All fields required");
      return;
    }

    if (Number(startTime) >= Number(endTime)) {
      setError("Start time must be less than end time");
      return;
    }

    try {
      await addSurgery(form);

      setForm({
        doctorId: "",
        surgeryDate: "",
        startTime: "",
        endTime: "",
        category: ""
      });

      setError("");
      fetchData();
    } catch {
      setError("Failed to add surgery");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Surgeries</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* ADD FORM */}
      <div className="card p-3 mb-4">
        <h5>Add Surgery</h5>

        <form onSubmit={handleSubmit}>
          <select
            className="form-control mb-2"
            value={form.doctorId}
            onChange={(e) =>
              setForm({ ...form, doctorId: e.target.value })
            }
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="form-control mb-2"
            value={form.surgeryDate}
            onChange={(e) =>
              setForm({ ...form, surgeryDate: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Start Time"
            value={form.startTime}
            onChange={(e) =>
              setForm({ ...form, startTime: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="End Time"
            value={form.endTime}
            onChange={(e) =>
              setForm({ ...form, endTime: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <button className="btn btn-danger">Add Surgery</button>
        </form>
      </div>

      {/* TOGGLE */}
      <div className="mb-3">
        <button
          className={`btn me-2 ${
            view === "today" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("today")}
        >
          Today
        </button>

        <button
          className={`btn ${
            view === "all" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("all")}
        >
          All History
        </button>
      </div>

      {/* TABLE */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Doctor</th>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Category</th>
            <th>Actions</th> {/*  NEW */}
          </tr>
        </thead>

        <tbody>
          {surgeries.map((s) => (
            <tr key={s._id}>
              <td>{s.doctorId?.name}</td>
              <td>{new Date(s.surgeryDate).toLocaleDateString()}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
              <td>{s.category}</td>

              <td>
                {/*  EDIT BUTTON */}
                <button
                  className="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() =>
                    setEditData({
                      id: s._id,
                      startTime: s.startTime,
                      endTime: s.endTime
                    })
                  }
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*  EDIT MODAL */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5>Edit Surgery Time</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">

              <input
                className="form-control mb-2"
                value={editData.startTime}
                onChange={(e) =>
                  setEditData({ ...editData, startTime: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editData.endTime}
                onChange={(e) =>
                  setEditData({ ...editData, endTime: e.target.value })
                }
              />

              <button
                className="btn btn-success w-100"
                onClick={async () => {
                  if (
                    Number(editData.startTime) >= Number(editData.endTime)
                  ) {
                    alert("Invalid time");
                    return;
                  }

                  try {
                    await updateSurgery(editData.id, {
                      startTime: editData.startTime,
                      endTime: editData.endTime
                    });

                    fetchData();

                    document
                      .querySelector("#editModal .btn-close")
                      .click();
                  } catch {
                    alert("Update failed");
                  }
                }}
              >
                Save
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Surgeries;