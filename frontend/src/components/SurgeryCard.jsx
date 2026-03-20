function SurgeryCard({ surgery }) {
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="card-title">
          Doctor: {surgery.doctorId?.name}
        </h5>

        <p className="card-text">
          Date: {new Date(surgery.surgeryDate).toLocaleDateString()}
        </p>

        <p className="card-text">
          Time: {surgery.startTime} - {surgery.endTime}
        </p>

        <p className="card-text">
          Category: {surgery.category}
        </p>
      </div>
    </div>
  );
}

export default SurgeryCard;