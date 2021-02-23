import axios from "axios";
import secrets from "../../secrets";
import {
  SearchLoginUserData,
  SearchLoginTagData,
  SearchLogoutUserData,
  SearchLogoutTagData,
} from "../../data/ApiData";

const API_ROOT_URI = secrets.API_ROOT_URI;
const VIA_API_DEV = secrets.VIA_API_DEV;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const SEARCH_LOGIN_USER = async (req, config) => {
  //replace_console_log("SEARCH_LOGIN_USER : REQUEST => " + req);

  let status: number = 0;
  let data: {
    accountId: number;
    accountName: string;
    accountEmail: string;
    accountNickname: string;
    accountCreateDate: string;
    accountBio: string;
    accountPhoto: string;
    following?: Array<{ id: number; name: string; nickname: string }>;
    follower?: Array<{ id: number; name: string; nickname: string }>;
    accountFollowingCnt: number;
    accountFollowerCnt: number;
    writtenPosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    writtenPostsCnt: number;
    likePosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    tags?: Array<{ tagId: number }>;
    followState: boolean;
  } = {
    accountId: 0,
    accountName: "",
    accountNickname: "",
    accountEmail: "",
    accountCreateDate: "",
    accountBio: "",
    accountPhoto: "",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: [],
    writtenPostsCnt: 0,
    likePosts: [],
    tags: [],
    followState: false,
  };

  if (!VIA_API_DEV) {
    //replace_console_log("SEARCH_LOGIN_USER : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 204;
      data = SearchLoginUserData.data;
    } catch (error) {
      //replace_console_log(error);
    }
  } else {
    //replace_console_log("SEARCH_LOGIN_USER : DEV");

    try {
      await axios
        .get(`${API_ROOT_URI}/api/search/login/${req}`, config)
        .then((res) => {
          data = res.data.data;
          status = res.status;
        });
    } catch (error) {
      //replace_console_log(error);
    }
  }

  return { status, data };
};

export const SEARCH_LOGIN_TAG = async (req, config) => {
  console.log("SEARCH_LOGIN_TAG : REQUEST => " + req);

  // interestedPeopleCnt 이 태그를 관심태그로 지정한 유저 수
  // mostContributor : 이 태그에 가장 많이 글 쓴 사람 Top3
  //      { accountId: 24
  //        accountPhoto: "https://firebase" }
  // mostPopularPosts : 이 태그에서 가장 인기있는 글

  let status: number = 0;
  let data: {
    writtenPosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    writtenPostsCnt: number;
    tagState: boolean;
  } = {
    writtenPosts: [],
    writtenPostsCnt: 0,
    tagState: false,
  };

  if (!VIA_API_DEV) {
    console.log("SEARCH_LOGIN_TAG : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = SearchLoginTagData.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("SEARCH_LOGIN_TAG : DEV");

    try {
      await axios
        .get(`${API_ROOT_URI}/api/search/login/${req}`, config)
        .then((res) => {
          data = res.data.data;
          status = res.status;
        });
    } catch (error) {
      console.log(error);
    }
  }

  return { status, data };
};

export const SEARCH_LOGOUT_USER = async (req) => {
  //replace_console_log("SEARCH_LOGOUT_USER : REQUEST => " + req);

  let status: number = 0;
  let data: {
    accountId: number;
    accountName: string;
    accountEmail: string;
    accountNickname: string;
    accountCreateDate: string;
    accountBio: string;
    accountPhoto: string;
    following?: Array<{ id: number; name: string; nickname: string }>;
    follower?: Array<{ id: number; name: string; nickname: string }>;
    accountFollowingCnt: number;
    accountFollowerCnt: number;
    writtenPosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    writtenPostsCnt: number;
    likePosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    tags?: Array<{ tagId: number }>;
    followState: boolean;
  } = {
    accountId: 0,
    accountName: "",
    accountNickname: "",
    accountEmail: "",
    accountCreateDate: "",
    accountBio: "",
    accountPhoto: "",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: [],
    writtenPostsCnt: 0,
    likePosts: [],
    tags: [],
    followState: false,
  };

  if (!VIA_API_DEV) {
    //replace_console_log("SEARCH_LOGOUT_USER : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = SearchLogoutUserData.data;
    } catch (error) {
      //replace_console_log(error);
    }
  } else {
    //replace_console_log("SEARCH_LOGOUT_USER : DEV");

    try {
      await axios
        .get(`${API_ROOT_URI}/api/search/logout/${req}`)
        .then((res) => {
          data = res.data.data;
          status = res.status;
        });
    } catch (error) {
      //replace_console_log(error);
    }
  }

  return { status, data };
};

export const SEARCH_LOGOUT_TAG = async (req) => {
  //replace_console_log("SEARCH_LOGOUT_TAG : REQUEST => " + req);

  let status: number = 0;
  let data: {
    writtenPosts?: Array<{
      postsId: number;
      postsWriter: string;
      postsTitle: string;
      postsPhoto: string;
    }>;
    writtenPostsCnt: number;
    tagState: boolean;
  } = {
    writtenPosts: [],
    writtenPostsCnt: 0,
    tagState: false,
  };

  if (!VIA_API_DEV) {
    //replace_console_log("SEARCH_LOGOUT_TAG : LOCAL");

    try {
      await timeout(1000);
      // throw new Error();
      status = 200;
      data = SearchLogoutTagData.data;
    } catch (error) {
      //replace_console_log(error);
    }
  } else {
    //replace_console_log("SEARCH_LOGOUT_TAG : DEV");

    try {
      await axios
        .get(`${API_ROOT_URI}/api/search/logout/${req}`)
        .then((res) => {
          data = res.data.data;
          status = res.status;
        });
    } catch (error) {
      //replace_console_log(error);
    }
  }

  return { status, data };
};
