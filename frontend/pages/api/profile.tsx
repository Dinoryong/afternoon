import axios from "axios";
import API_ROOT_URI from "../../secrets";

export const GET_MY_INFO = async (req) => {
  console.log(req);
  await axios.get(API_ROOT_URI + "/accounts/" + req.accountId).then((res) => {
    console.log(res.data);
  });
};
