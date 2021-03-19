import axiosServices from "./axiosServices";
const config = require("../configuration/config");

const axiosService = new axiosServices();

export default class userServices {
  Registration(data) {
    let url = config.Registration;
    // console.log("Url User:", url);
    return axiosService.post(url, data, false);
  }

  login(data) {
    let url = config.Login;
    return axiosService.post(url, data, false);
  }

  fetchDataById(data) {
    let url = config.getUsersById;
    return axiosService.post(url, data, false);
  }

  forgetPassword(data) {
    let url = config.forgetPassword;
    return axiosService.post(url, data, false);
  }

  resetPassword(data) {
    let url = config.resetPassword;
    return axiosService.patch(url, data, false);
  }
}
