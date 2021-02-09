import axios from "axios";
import secrets from "../../secrets";
import {
  SignUpData,
  EmailLoginData,
  CheckEmailData,
  ConfirmLoginData,
  AutoLoginData,
} from "../../data/ApiData";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SIGN_UP = async (req) => {
  console.log("SIGN_UP : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: { accountEmail: string } = { accountEmail: "" };

  if (!VIA_API_DEV) {
    console.log("SIGN_UP : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 201;
      data = SignUpData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("SIGN_UP : DEV");

    try {
      await axios.post(`${API_ROOT_URI}/api/accounts`, req).then((res) => {
        status = res.status;
        data = res.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const EMAIL_LOGIN = async (req) => {
  console.log("EMAIL_LOGIN : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("EMAIL_LOGIN : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = EmailLoginData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("EMAIL_LOGIN : DEV");

    try {
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        status = res.status;
        data = res.data.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const CHECK_EMAIL = async (req) => {
  console.log("CHECK_EMAIL : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("CHECK_EMAIL : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = CheckEmailData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("CHECK_EMAIL : DEV");

    try {
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        data = res.data.data;
        status = res.status;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const CONFIRM_LOGIN = async (req) => {
  console.log("CONFIRM_LOGIN : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {
    accountId: number;
    accountEmail: string;
    accountNickname: string;
  } = {
    accountId: 0,
    accountEmail: "",
    accountNickname: "",
  };
  let headers: { authorization: string } = { authorization: "" };

  if (!VIA_API_DEV) {
    console.log("CONFIRM_LOGIN : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = ConfirmLoginData.data;
      headers.authorization =
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMzMTMyMTcsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRuZ25nbjMwNDVAZ21haWwuY29tIn0.BBp6ruE_7HOk2OQsY6Y3fXP1YikoXdeSm-6zAUd97b0";
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("CONFIRM_LOGIN : DEV");

    try {
      await axios.post(API_ROOT_URI + "/api/login", req).then((res) => {
        data = res.data.data;
        status = res.status;
        headers = res.headers;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data, headers };
};

export const LOG_OUT = async () => {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("accountId");
  window.localStorage.setItem("accountEmail", "");
  window.localStorage.removeItem("accountNickname");
};

export const AUTO_LOGIN = async (req, config) => {
  console.log("AUTO_LOGIN : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {
    accountId: number;
    accountEmail: string;
    accountNickname: string;
  } = {
    accountId: 0,
    accountEmail: "",
    accountNickname: "",
  };
  let headers: { authorization: string } = { authorization: "" };

  if (!VIA_API_DEV) {
    console.log("AUTO_LOGIN : LOCAL");

    try {
      await timeout(500);
      // throw new Error();
      status = 200;
      data = AutoLoginData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("AUTO_LOGIN : DEV");

    try {
      await axios
        .post(API_ROOT_URI + "/api/auto-login", req, config)
        .then((res) => {
          status = res.status;
          data = res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data, headers };
};
