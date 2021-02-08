import axios from "axios";
import FeedRes from "../../data/FeedRes";
import secrets from "../../secrets";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

export const GET_MY_INFO = async () => {
  const authToken = window.localStorage.getItem("authToken");

  if (!VIA_API_DEV) {
    try {
      return {
        status: 200,
        data: FeedRes.FeedResDummySmall.data,
      };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  } else {
    let status;
    let data;

    try {
      await axios
        .get(API_ROOT_URI + "/api/accounts", {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          console.log(res);
          data = res.data.data;
          status = res.status;
        });

      return { status, data };
    } catch (error) {
      console.log(error);
    }
    return { status: false };
  }
};

export const ADD_TAGS = async (req) => {
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
    // API 요청 시 실행
    let status;
    let data;

    try {
      await axios
        .put(API_ROOT_URI + "/api/accounts/mytag", req, {
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

export const DELETE_TAGS = async (req) => {
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
        .put(API_ROOT_URI + "/api", req, {
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
        .put(API_ROOT_URI + "/api/accounts/myfollowing", req, {
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
