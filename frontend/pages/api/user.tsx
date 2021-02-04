import axios from "axios";
import secrets from "../../secrets";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

export const SIGN_UP = async (req) => {
  if (!VIA_API_DEV) {
    try {
      return { status: 200, data: {} };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    // API 요청 시 실행
    let data = { data: { accountEmail: "" } };
    let status = 0;

    try {
      await axios.post(`${API_ROOT_URI}/api/accounts`, req).then((res) => {
        console.log(res);
        data = res.data.data;
        status = res.status;
      });
      return { status, data };
    } catch (error) {
      console.log(error);
    }

    return { status: status };
  }
};

export const REQUEST_LOGIN = async (req) => {
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
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        console.log(res);
        data = res.data;
        status = res.status;
      });
      return { status, data };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  }
};

export const CHECK_EMAIL = async (req) => {
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
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        console.log(res);
        data = res.data;
        status = res.status;
      });
      return { status, data };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  }
};

export const CONFIRM_LOGIN = async (req) => {
  if (!VIA_API_DEV) {
    try {
      return {
        data: { accountEmail: "dngngn3045@gmail.com", accountId: 1 },
        status: 200,
        headers: { authorization: "Bearer dkanxhzmswlqdjsjgrl" },
      };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    // API 요청 시 실행
    let data;
    let status;
    let headers;

    try {
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        console.log(res);
        data = res.data;
        status = res.status;
        headers = res.headers;
      });
      return {
        status,
        data,
        headers,
      };
    } catch (error) {
      console.log(error);
    }
    return {
      status: false,
    };
  }
};

export const LOG_OUT = async () => {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("accountId");
  window.localStorage.removeItem("accountEmail");
};

export const AUTO_LOGIN = async () => {
  const accountEmail = window.localStorage.getItem("accountEmail");
  const accountId = window.localStorage.getItem("accountId");
  const authToken = window.localStorage.getItem("authToken");
  if (!VIA_API_DEV) {
    try {
      return { status: 200, data: {} };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    // API 요청 시 실행
    let status;
    let data;

    try {
      await axios
        .post(
          API_ROOT_URI + "/api/auto-login",
          { accountId, accountEmail },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res) => {
          console.log(res);
          status = res.status;
          data = res.data;
        });
      return { status, data };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  }
};
