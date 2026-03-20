function DoctorCard({ doctor, onDelete }) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(doctor._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;