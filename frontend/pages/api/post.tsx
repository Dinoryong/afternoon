import axios from "axios";
import secrets from "../../secrets";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

export const SUBMIT_POST = async (req) => {
  if (!VIA_API_DEV) {
    try {
      return { status: 200, data: {} };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    // API 요청 시 실행
    let data = {};
    let status = 0;

    try {
      await axios
        .post(`${API_ROOT_URI}/api/posts`, req, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          console.log(res);
          data = res.data;
          status = res.status;
        });
      return { status, data };
    } catch (error) {
      console.log(error);
    }

    return { status, data };
  }
};