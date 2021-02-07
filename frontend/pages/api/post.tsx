import axios from "axios";
import secrets from "../../secrets";
import FeedRes from "../../data/FeedRes";

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

export const GET_FEED = async () => {
  if (!VIA_API_DEV) {
    try {
      return {
        status: 200,
        data: FeedRes.FeedResDummy.data,
      };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    // API 요청 시 실행
    let data;
    let status;

    try {
      await axios
        .get(`${API_ROOT_URI}/api/feed`, {
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

export const ADD_FOLLOW_USERS = async (req) => {
  const authToken = window.localStorage.getItem("authToken");
  if (!VIA_API_DEV) {
    try {
      console.log(req);
      console.log(authToken);

      return { status: 200, data: {} };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    let status;
    let data;

    try {
      await axios
        .put(API_ROOT_URI + "/api/", req, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
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

export const DELETE_FOLLOW_USERS = async (req) => {
  const authToken = window.localStorage.getItem("authToken");
  if (!VIA_API_DEV) {
    try {
      console.log(req);
      console.log(authToken);

      return { status: 200, data: {} };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    try {
      await axios
        .put(API_ROOT_URI + "/api/", req, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }
};
