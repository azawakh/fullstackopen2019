import axios from "axios";

const baseUrl = "http://localhost:3001/people";

export default {
  getAll() {
    return axios.get(baseUrl).then(({ data }) => data);
  },
  create(person) {
    return axios.post(baseUrl, person).then(({ data }) => data);
  },
  update(id, newPerson) {
    return axios.put(`${baseUrl}/${id}`, newPerson).then(({ data }) => data);
  },
  delete(id) {
    return axios.delete(`${baseUrl}/${id}`).then(({ data }) => data);
  }
};
