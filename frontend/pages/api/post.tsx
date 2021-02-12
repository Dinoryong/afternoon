import axios from "axios";
import secrets from "../../secrets";
import {
  FeedListData,
  FeedNullData,
  GetOnePostData,
  SubmitPostData,
} from "../../data/ApiData";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SUBMIT_POST = async (req, config) => {
  console.log("SUBMIT_POST : REQUEST");
  console.log(req);

  let status: number = 0;
  let data: {
    postsTitle?: String;
    postsContents?: String;
    postsPhotos?: Array<string>;
    tags?: Array<{ tagId: number }>;
    pins?: Array<{
      pinName?: string;
      pinLocY?: number;
      pinLocX?: number;
      pinLink?: string;
      pinNum?: number;
      pinApiLink?: string;
      pinApiClass?: string;
    }>;
  } = {
    postsTitle: "",
    postsContents: "",
    postsPhotos: [],
    tags: [],
    pins: [],
  };

  if (!VIA_API_DEV) {
    console.log("SUBMIT_POST : REQUEST");
    try {
      await timeout(1000);
      // throw new Error();
      return { status: 201, data: SubmitPostData.data };
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("SUBMIT_POST : REQUEST");

    try {
      await axios.post(`${API_ROOT_URI}/api/posts`, req, config).then((res) => {
        data = res.data;
        status = res.status;
      });
    } catch (error) {
      console.log(error);
    }

    return { status, data };
  }
};

export const GET_FEED = async (config) => {
  console.log("GET_FEED : REQUEST");

  let status: number = 0;
  let data: Array<{
    postsId: number;
    postsWriter: string;
    postsTitle: string;
    postsPhoto: string;
  }> = [];

  if (!VIA_API_DEV) {
    console.log("GET_FEED : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = FeedListData.data;
      // data = FeedNullData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("GET_FEED : DEV");

    try {
      await axios.get(`${API_ROOT_URI}/api/feed`, config).then((res) => {
        data = res.data.data;
        status = res.status;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const GET_ONE_POST = async (req) => {
  console.log("GET_ONE_POST : REQUEST => " + req);

  let status: number = 0;
  let data: {
    postsTitle: String;
    postsContents: String;
    postsPhotos: Array<string>;
    tags: Array<{ tagId: number }>;
    pins: Array<{
      pinName: string;
      pinLocY: number;
      pinLocX: number;
      pinLink: string;
      pinNum: number;
      pinApiLink: string;
      pinApiClass: string;
    }>;
  } = {
    postsTitle: "",
    postsContents: "",
    postsPhotos: [],
    tags: [],
    pins: [],
  };

  if (!VIA_API_DEV) {
    console.log("GET_ONE_POST : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = GetOnePostData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("GET_ONE_POST : DEV");

    let data;
    let status;

    try {
      await axios.get(`${API_ROOT_URI}/api/posts/${req}`).then((res) => {
        data = res.data.data;
        status = res.status;
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};
