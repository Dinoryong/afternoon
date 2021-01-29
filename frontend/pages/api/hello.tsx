// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export const GET_SAMPLE = async () => {
  await axios.get("http://118.34.136.73:8080/api/sample").then((res) => {
    console.log(res);
  });
};

export const POST_SAMPLE = async (req) => {
  await axios.post("http://118.34.136.73:8080/api/sample", req).then((res) => {
    console.log(res);
    console.log(res.headers.headertest);
  });
};

// export default (req, res) => {
//   res.statusCode = 200;
//   res.json({ name: "John Doe" });
// };
