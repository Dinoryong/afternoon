import axios from "axios";
import secrets from "../../secrets";
import FeedRes from "../../data/FeedRes";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

export const GET_SEARCH = async (routerQuery) => {
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
    // API 요청 시 실행
    let data;
    let status;

    try {
      await axios
        .get(`${API_ROOT_URI}/api/search/${routerQuery}`)
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
