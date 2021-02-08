import axios from "axios";
import secrets from "../../secrets";
import FeedRes from "../../data/FeedRes";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

export const GET_SEARCH_LOGIN = async (routerQuery) => {
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
        .get(`${API_ROOT_URI}/api/search/login/${routerQuery}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
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

    return { status, data };
  }
};

export const GET_SEARCH_LOGOUT = async (routerQuery) => {
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
        .get(`${API_ROOT_URI}/api/search/logout/${routerQuery}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
          },
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

    return { status, data };
  }
};
