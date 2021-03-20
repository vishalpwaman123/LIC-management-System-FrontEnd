const axios = require("axios").default;

export default class axiosServices {
  post(url, data, isRequiredHeader = false, header) {
    console.log("Data User:", data);
    console.log("Url User:", url);
    return axios.post(url, data, isRequiredHeader && header);
  }

  get(url, isRequiredHeader = false, header) {
    return axios.get(url, isRequiredHeader && header);
  }

  patch(url, data, isRequiredHeader = false, header) {
    return axios.patch(url, data, isRequiredHeader && header);
  }

  delete(url, data, isRequiredHeader = false, header) {
    return axios.delete(url, data, isRequiredHeader && header);
  }
}
