import API from "./api";

// get all doctors
export const getDoctors = () => API.get("/doctors");

export const getDoctorById = (id) =>
  API.get(`/doctors/${id}`);

// add doctor
export const addDoctor = (data) => API.post("/doctors", data);

// delete doctor
export const deleteDoctor = (id) => API.delete(`/doctors/${id}`);

// update doctor
export const updateDoctor = (id, data) =>
  API.put(`/doctors/${id}`, data);