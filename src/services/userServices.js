import axiosServices from "./axiosServices";
const config = require("../configuration/config");

const axiosService = new axiosServices();

export default class userServices {
  Registration(data) {
    let url = config.Registration;
    // console.log("Url User:", url);
    return axiosService.post(url, data, false);
  }
}
