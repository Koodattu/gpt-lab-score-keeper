// api.js
// Simple API helper for json-server
const API_URL = "http://localhost:3001";

const api = {
  async get(path) {
    const res = await fetch(API_URL + path);
    return res.json();
  },
  async post(path, data) {
    const res = await fetch(API_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async patch(path, data) {
    const res = await fetch(API_URL + path, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  async delete(path) {
    await fetch(API_URL + path, { method: "DELETE" });
  },
};

export default api;
