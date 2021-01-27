import axios from "axios";
import API_ROOT_URI from "../../secrets";

export const SIGN_UP = async (req) => {
  console.log(req);
  await axios.post(API_ROOT_URI + "/api/accounts", req).then((res) => {
    console.log(res.data);
  });
};

export const REQUEST_LOGIN = async (req) => {
  try {
    // await axios.post(API_ROOT_URI + "/api/login", loginProps).then((res) => {
    //   console.log(res.data);
    // });
    return { status: true, accountEmail: req.accountEmail };
  } catch (error) {
    console.log(error);
  }
  return { status: false };
};

export const CHECK_EMAIL = async (req) => {
  await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
    console.log(res.data);
  });
};

export const CONFIRM_LOGIN = async (req) => {
  await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
    console.log(res.data);
    console.log(res.headers);
    const authToken = res.headers.authorization.slice(7);
    console.log(authToken);
    window.sessionStorage.setItem("accountEmail", res.data.accountEmail);
    window.sessionStorage.setItem("accountId", res.data.accountId);
    window.sessionStorage.setItem("authToken", authToken);
  });
};

export const LOG_OUT = async () => {
  window.sessionStorage.removeItem("authToken");
  window.sessionStorage.removeItem("accountId");
  window.sessionStorage.removeItem("accountEmail");
};

export const AUTO_LOGIN = async () => {
  const accountEmail = window.sessionStorage.getItem("accountEmail");
  const accountId = window.sessionStorage.getItem("accountId");
  const authToken = window.sessionStorage.getItem("authToken");

  await axios
    .post(
      API_ROOT_URI + "/api/auto-login",
      { accountId, accountEmail },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
};
