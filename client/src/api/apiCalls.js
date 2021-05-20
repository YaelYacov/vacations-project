import axios from "axios";
let GlobalURL = "http://www.localhost:5292";

export function getRequest(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.get(GlobalURL + url);

      resolve(res);
    } catch (err) {
      resolve(err);
    }
  });
}

export function postRequest(url, ob) {
  // console.log(GlobalURL + url, ob);
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.post(GlobalURL + url, ob);

      resolve(res);
    } catch (err) {
      resolve(err);
    }
  });
}
