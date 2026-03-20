import API from "./api";

// get all specializations
export const getSpecializations = () =>
  API.get("/specializations");

// add specialization
export const addSpecialization = (data) =>
  API.post("/specializations", data);