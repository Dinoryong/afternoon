import axios from "axios";
import FeedRes from "../../data/FeedRes";
import secrets from "../../secrets";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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

export const ADD_TAGS = async (req, config) => {
  console.log("ADD_TAGS : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("ADD_TAGS : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = {};
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("ADD_TAGS : DEV");

    try {
      await axios
        .put(API_ROOT_URI + "/api/accounts/mytag", req, config)
        .then((res) => {
          status = res.status;
          data = res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const DELETE_TAGS = async (req, config) => {
  console.log("DELETE_TAGS : REQUEST => " + req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("DELETE_TAGS : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = {};
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("DELETE_TAGS : DEV");

    try {
      await axios
        .delete(API_ROOT_URI + `/api/accounts/mytag/${req}`, config)
        .then((res) => {
          status = res.status;
          data = res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const FOLLOW_USER = async (req, config) => {
  console.log("FOLLOW_USER : REQUEST => " + req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("FOLLOW_USER : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = {};
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("FOLLOW_USER : DEV");

    try {
      await axios
        .put(API_ROOT_URI + "/api/accounts/myfollowing", req, config)
        .then((res) => {
          status = res.status;
          data = res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const UNFOLLOW_USER = async (req, config) => {
  console.log("UNFOLLOW_USER : REQUEST => " + req);

  let status: number = 0;
  let data: {} = {};

  if (!VIA_API_DEV) {
    console.log("UNFOLLOW_USER : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = {};
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("UNFOLLOW_USER : DEV");

    try {
      await axios
        .delete(API_ROOT_URI + `/api/accounts/myfollowing/${req}`, config)
        .then((res) => {
          status = res.status;
          data = res.data.data;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};
