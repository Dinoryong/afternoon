export const SignUpData = {
  httpStatus: "CREATED",
  headers: null,
  data: {
    accountId: 24,
    accountName: "이재욱",
    accountNickname: "난재",
    accountEmail: "dngngn3045@gmail.com",
    accountCreateDate: "2021-02-08",
    accountBio: "",
    accountPhoto: "",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: null,
    writtenPostsCnt: 0,
    likePosts: [],
    tags: [],
  },
};

export const EmailLoginData = {
  httpStatus: "OK",
  headers: { Authorization: ["default"] },
  data: { message: "성공적으로 메일이 전송되었습니다." },
};

export const CheckEmailData = {
  httpStatus: "OK",
  headers: { Authorization: ["default"] },
  data: { message: "인증키가 일치합니다.", "first-login": "true" },
};

export const ConfirmLoginData = {
  httpStatus: "OK",
  headers: {
    Authorization: [
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMyMjY1ODYsImFjY291bnRJZCI6MzQsImFjY291bnRFbWFpbCI6ImRuZ25nbjMwNDVAaGFubWFpbC5uZXQifQ.U_PrkuaGt_IpxP8AjYiKxrX7id3EuOuENY2hI9VPNDQ",
    ],
  },
  data: {
    accountId: 24,
    accountEmail: "dngngn3045@gmail.com",
    accountNickname: "난재",
  },
};

export const AutoLoginData = {
  httpStatus: "OK",
  headers: {
    Authorization: [
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMyMjUyNDgsImFjY291bnRJZCI6MjQsImFjY291bnRFbWFpbCI6ImRuZ25nbjMwNDVAZ21haWwuY29tIn0.y8DnQEkyrHAjhnog7gnwGGeQQXz2dHGzPLtlSMDiTJ4",
    ],
  },
  data: {
    accountId: 24,
    accountEmail: "dngngn3045@gmail.com",
    accountNickname: "난재",
  },
};

export const SubmitPostData = {
  httpStatus: "CREATED",
  headers: null,
  data: {
    postsTitle: "헬스장",
    postsContents: "",
    postsPhotos: [
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FQzddbMK6AHAxhEiY?alt=media&token=dd0e875c-9b15-426a-9339-5d91eb8ab109",
    ],
    tags: [{ tagId: 22 }],
    pins: [],
    comments: [],
  },
};

export const GetProfileData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 24,
    accountName: "이재욱",
    accountNickname: "난재",
    accountEmail: "dngngn3045@gmail.com",
    accountCreateDate: "2021-02-07",
    accountBio: "",
    accountPhoto: "",
    following: [{ id: 34, name: "회원체크", nickname: "회원쳌" }],
    follower: [],
    accountFollowingCnt: 1,
    accountFollowerCnt: 0,
    writtenPosts: [
      {
        postsId: 24,
        postsWriter: "이재욱",
        postsTitle: "내 수집품!",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
      },
    ],
    writtenPostsCnt: 1,
    likePosts: [],
    tags: [{ tagId: 2 }, { tagId: 4 }, { tagId: 9 }, { tagId: 7 }],
  },
};

export const FeedNullData = { httpStatus: "OK", headers: null, data: [] };

export const FeedListData = {
  httpStatus: "OK",
  headers: null,
  data: [
    {
      postsId: 35,
      postsTitle: "피드리스트 테스트",
      postsPhoto:
        "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FNuQgGJYw2Y8L5r9o?alt=media&token=8fbe4205-9a42-41fc-a516-959d1e53bf16",
      postsWriter: "회원쳌",
    },
    {
      postsId: 24,
      postsTitle: "내 수집품!",
      postsPhoto:
        "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
      postsWriter: "난재",
    },
  ],
};

export const AddPreferTagsData = {};

export const GetSearchUserOnLoginNullData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 33,
    accountName: "네이버",
    accountNickname: "네입재욱",
    accountEmail: "dngngn3045@naver.com",
    accountCreateDate: "2021-02-08",
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
  },
};

export const GetSearchUserOnLoginData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 34,
    accountName: "회원체크",
    accountNickname: "회원쳌",
    accountEmail: "dngngn3045@hanmail.net",
    accountCreateDate: "2021-02-08",
    accountBio: "",
    accountPhoto: "",
    following: [],
    follower: [{ id: 24, name: "이재욱", nickname: "난재" }],
    accountFollowingCnt: 0,
    accountFollowerCnt: 1,
    writtenPosts: [
      {
        postsId: 35,
        postsWriter: "회원체크",
        postsTitle: "피드리스트 테스트",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FNuQgGJYw2Y8L5r9o?alt=media&token=8fbe4205-9a42-41fc-a516-959d1e53bf16",
      },
      {
        postsId: 36,
        postsWriter: "회원체크",
        postsTitle: "헬스장",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FQzddbMK6AHAxhEiY?alt=media&token=dd0e875c-9b15-426a-9339-5d91eb8ab109",
      },
    ],
    writtenPostsCnt: 2,
    likePosts: [],
    tags: [{ tagId: 14 }, { tagId: 12 }, { tagId: 18 }],
    followState: true,
  },
};

export const GetSearchUserOnLogoutData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 34,
    accountName: "회원체크",
    accountNickname: "회원쳌",
    accountEmail: "dngngn3045@hanmail.net",
    accountCreateDate: "2021-02-08",
    accountBio: "",
    accountPhoto: "",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: [
      {
        postsId: 35,
        postsWriter: "회원체크",
        postsTitle: "피드리스트 테스트",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FNuQgGJYw2Y8L5r9o?alt=media&token=8fbe4205-9a42-41fc-a516-959d1e53bf16",
      },
      {
        postsId: 36,
        postsWriter: "회원체크",
        postsTitle: "헬스장",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FQzddbMK6AHAxhEiY?alt=media&token=dd0e875c-9b15-426a-9339-5d91eb8ab109",
      },
    ],
    writtenPostsCnt: 2,
    likePosts: [],
    tags: [{ tagId: 12 }, { tagId: 14 }, { tagId: 18 }],
    followState: false,
  },
};

export const GetSearchTagOnLoginNullData = {
  httpStatus: "OK",
  headers: null,
  data: { writtenPosts: [], writtenPostsCnt: 0, tagState: false },
};

export const GetSearchTagOnLoginData = {
  httpStatus: "OK",
  headers: null,
  data: {
    writtenPosts: [
      {
        postsId: 24,
        postsWriter: "이재욱",
        postsTitle: "내 수집품!",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
      },
    ],
    writtenPostsCnt: 1,
    tagState: false,
  },
};

export const GetSearchTagOnLogoutData = {
  httpStatus: "OK",
  headers: null,
  data: {
    writtenPosts: [
      {
        postsId: 24,
        postsWriter: "이재욱",
        postsTitle: "내 수집품!",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
      },
    ],
    writtenPostsCnt: 1,
    tagState: false,
  },
};

export const GetOnePostData = {
  httpStatus: "OK",
  headers: null,
  data: {
    postsTitle: "내 수집품!",
    postsContents: "소중한 수집품입니다",
    postsPhotos: [
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F7hxN1QsImYbiSbPc?alt=media&token=593881d8-a47b-4ea3-b6db-4fe5d23abed2",
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FO5aSgSQoYqGYZXGx?alt=media&token=ae176246-b8eb-4900-b61c-1b99ffd5ba37",
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FSeGqNdkV3dcpciXj?alt=media&token=70646626-595b-42a3-9b76-755e976728f8",
    ],
    tags: [{ tagId: 12 }, { tagId: 2 }],
    pins: [
      {
        pinName: "아무핀",
        pinLocY: 73.67088607594937,
        pinLocX: 36.81214421252372,
        pinLink: "",
        pinNum: 1,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "노트",
        pinLocY: 29.873417721518987,
        pinLocX: 32.44781783681214,
        pinLink: "",
        pinNum: 1,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "카메라",
        pinLocY: 45.31645569620253,
        pinLocX: 80.07590132827325,
        pinLink: "",
        pinNum: 1,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "이어폰",
        pinLocY: 29.11392405063291,
        pinLocX: 31.688804554079695,
        pinLink: "",
        pinNum: 2,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "스마트폰",
        pinLocY: 65.82278481012658,
        pinLocX: 65.84440227703985,
        pinLink: "",
        pinNum: 2,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "커피",
        pinLocY: 20.506329113924053,
        pinLocX: 81.59392789373814,
        pinLink: "",
        pinNum: 2,
        pinApiLink: "",
        pinApiClass: "",
      },
      {
        pinName: "테니스공",
        pinLocY: 77.11757269279393,
        pinLocX: 39.27893738140417,
        pinLink: "",
        pinNum: 3,
        pinApiLink: "",
        pinApiClass: "",
      },
    ],
    comments: [],
  },
};
