import API from "./api";

// get all surgeries
export const getSurgeries = () =>
  API.get("/surgeries");

// get today's surgeries
export const getTodaySurgeries = () =>
  API.get("/surgeries/today");

// add surgery
export const addSurgery = (data) =>
  API.post("/surgeries", data);

// update surgery
export const updateSurgery = (id, data) =>
  API.put(`/surgeries/${id}`, data);




export const assignSpecialization = (data) =>
  API.post("/doctor-specialization", data);

// existing functions (if any)
export const getDoctorSpecs = (doctorId) =>
  API.get(`/doctor-specialization/${doctorId}`);

export const updateDoctorSpec = (data) =>
  API.put("/doctor-specialization", data);