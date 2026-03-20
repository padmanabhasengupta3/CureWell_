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