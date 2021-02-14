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
  headers: { authorization: ["default"] },
  data: { message: "성공적으로 메일이 전송되었습니다." },
};

export const CheckEmailData = {
  httpStatus: "OK",
  headers: { authorization: ["default"] },
  data: { message: "인증키가 일치합니다.", "first-login": "true" },
};

export const ConfirmLoginData = {
  httpStatus: "OK",
  headers: {
    authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLroZzqt7jsnbjthqDtgbAiLCJleHAiOjE2MTMyMjY1ODYsImFjY291bnRJZCI6MzQsImFjY291bnRFbWFpbCI6ImRuZ25nbjMwNDVAaGFubWFpbC5uZXQifQ.U_PrkuaGt_IpxP8AjYiKxrX7id3EuOuENY2hI9VPNDQ",
  },
  data: {
    accountId: 24,
    accountEmail: "dngngn3045@gmail.com",
    accountNickname: "난재",
  },
};

export const AutoLoginData = {
  httpStatus: "OK",
  headers: null,
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

export const GetMyInfoData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 24,
    accountName: "이재욱",
    accountNickname: "난재",
    accountEmail: "dngngn3045@gmail.com",
    accountCreateDate: "2021-02-07",
    accountBio: "",
    accountPhoto:
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F85KMvfD2G4DxpN72?alt=media&token=f4051b7b-7b1e-448c-8fb4-38e4665935cb",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: [
      {
        postsId: 1,
        postsWriter: "이재욱",
        postsTitle: "첫 게시글!",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F21pZUwb1qTaBR7O7?alt=media&token=4ff92079-66c2-4aa0-9483-54fe000b6fc4",
      },
    ],
    writtenPostsCnt: 1,
    likesPosts: [],
    likesPostsCnt: 0,
    tags: [],
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

export const SearchLoginUserNullData = {
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

export const SearchLoginUserData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 24,
    accountName: "이재욱",
    accountNickname: "난재",
    accountEmail: "dngngn3045@gmail.com",
    accountCreateDate: "2021-02-08",
    accountBio:
      "대통령이 궐위된 때 또는 대통령 당선자가 사망하거나 판결 기타의 사유로 그 자격을 상실한 때에는 60일 이내에 후임자를 선거한다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다.",
    accountPhoto:
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FdkIg4OEz3NvI0SPb?alt=media&token=6534e2ac-217a-4a5b-ae05-befd7d43e348",
    following: [],
    follower: [{ id: 34, name: "회원쳌", nickname: "회원체크" }],
    accountFollowingCnt: 0,
    accountFollowerCnt: 1,
    writtenPosts: [
      {
        postsId: 35,
        postsWriter: "난재",
        postsTitle: "피드리스트 테스트",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FNuQgGJYw2Y8L5r9o?alt=media&token=8fbe4205-9a42-41fc-a516-959d1e53bf16",
      },
      {
        postsId: 36,
        postsWriter: "난재",
        postsTitle: "헬스장",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FQzddbMK6AHAxhEiY?alt=media&token=dd0e875c-9b15-426a-9339-5d91eb8ab109",
      },
    ],
    writtenPostsCnt: 2,
    likePosts: [],
    tags: [{ tagId: 14 }, { tagId: 12 }, { tagId: 18 }],
    followState: false,
  },
};

export const SearchLoginTagNullData = {
  httpStatus: "OK",
  headers: null,
  data: { writtenPosts: [], writtenPostsCnt: 0, tagState: false },
};

export const SearchLoginTagData = {
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

export const SearchLogoutUserData = {
  httpStatus: "OK",
  headers: null,
  data: {
    accountId: 24,
    accountName: "이재욱",
    accountNickname: "난재",
    accountEmail: "dngngn3045@gmail.com",
    accountCreateDate: "2021-02-08",
    accountBio: "A302 화이팅~",
    accountPhoto: "",
    following: [],
    follower: [],
    accountFollowingCnt: 0,
    accountFollowerCnt: 0,
    writtenPosts: [
      {
        postsId: 35,
        postsWriter: "난재",
        postsTitle: "피드리스트 테스트",
        postsPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FNuQgGJYw2Y8L5r9o?alt=media&token=8fbe4205-9a42-41fc-a516-959d1e53bf16",
      },
      {
        postsId: 36,
        postsWriter: "난재",
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

export const SearchLogoutTagData = {
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
    postsId: 1,
    postsTitle: "첫 게시글!",
    postsContents: "내 첫 눈 게시글이예요~",
    postsWriteTime: "2021-02-14",
    postsLikeCnt: 0,
    likeState: false,
    postsWriter: {
      accountPhoto:
        "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F85KMvfD2G4DxpN72?alt=media&token=f4051b7b-7b1e-448c-8fb4-38e4665935cb",
      accountNickname: "난재",
    },
    postsPhotos: [
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F21pZUwb1qTaBR7O7?alt=media&token=4ff92079-66c2-4aa0-9483-54fe000b6fc4",
      "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2FQH5rJq8SoNBLKyJc?alt=media&token=957e2655-d663-4fc8-b569-4efb4a4ab7a2",
    ],
    tags: [{ tagId: 1 }, { tagId: 2 }, { tagId: 3 }],
    pins: [
      {
        pinId: 2,
        pinName: "마우스 이름 길게길게 로지텍 마우스 G370",
        pinLocY: 78.85375494071147,
        pinLocX: 89.72332015810277,
        pinLink: "https://naver.com",
        pinNum: 1,
        pinApiLink: "https://search.shopping.naver.com/gate.nhn?id=22742122709",
        pinApiClass: "유선마우스",
        comments: [
          {
            commentId: 8,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "https://google.com",
            commentContent: "마우스에 달기",
            pinName: "마우스",
          },
        ],
      },
      {
        pinId: 3,
        pinName: "펜",
        pinLocY: 16.99604743083004,
        pinLocX: 59.15678524374176,
        pinLink: "https://google.com",
        pinNum: 1,
        pinApiLink: "https://search.shopping.naver.com/gate.nhn?id=25750091306",
        pinApiClass: "펜",
        comments: [
          {
            commentId: 5,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "www.naver.com",
            commentContent: "펜에 댓글달기",
            pinName: "펜",
          },
          {
            commentId: 6,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "https://daum.net",
            commentContent: "펜에 다시 댓글달기",
            pinName: "펜",
          },
        ],
      },
      {
        pinId: 4,
        pinName: "애기옷",
        pinLocY: 94.25051334702259,
        pinLocX: 76.08695652173914,
        pinLink: "https://daum.net",
        pinNum: 2,
        pinApiLink: "https://search.shopping.naver.com/gate.nhn?id=82180543319",
        pinApiClass: "바디슈트/롬퍼",
        comments: [
          {
            commentId: 9,
            accountNickname: "난재",
            accountPhoto:
              "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F85KMvfD2G4DxpN72?alt=media&token=f4051b7b-7b1e-448c-8fb4-38e4665935cb",
            commentLink: "",
            commentContent: "애기옷 이쁘네요",
            pinName: "애기옷",
          },
          {
            commentId: 11,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "",
            commentContent: "전체 리턴 체크",
            pinName: "애기옷",
          },
          {
            commentId: 17,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "",
            commentContent: "ㅁㄴㅇㄹ",
            pinName: "애기옷",
          },
          {
            commentId: 20,
            accountNickname: "난재",
            accountPhoto: "",
            commentLink: "",
            commentContent: "ㅂㅈㄷㄱㅂㅈㄷㄱ",
            pinName: "애기옷",
          },
        ],
      },
    ],
    comments: [
      {
        commentContent: "펜에 댓글달기",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "www.naver.com",
        pinId: 3,
        pinNum: 1,
        pinName: "펜",
      },
      {
        commentContent: "펜에 다시 댓글달기",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "https://daum.net",
        pinId: 3,
        pinNum: 1,
        pinName: "펜",
      },
      {
        commentContent: "게시물에 달기",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "마우스에 달기",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "https://google.com",
        pinId: 2,
        pinNum: 1,
        pinName: "마우스",
      },
      {
        commentContent: "애기옷 이쁘네요",
        accountNickname: "난재",
        accountPhoto:
          "https://firebasestorage.googleapis.com/v0/b/ssafy-a302.appspot.com/o/images%2F85KMvfD2G4DxpN72?alt=media&token=f4051b7b-7b1e-448c-8fb4-38e4665935cb",
        commentLink: "",
        pinId: 4,
        pinNum: 2,
        pinName: "애기옷",
      },
      {
        commentContent: "ㅎㅎㅎ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "전체 리턴 체크",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: 4,
        pinNum: 2,
        pinName: "애기옷",
      },
      {
        commentContent: "갱신 체크",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "갱신 체크 200",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "갱신 다시체크 200 ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "상태변경",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "ㅁㄴㅇㄹ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "ㅁㄴㅇㄹ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: 4,
        pinNum: 2,
        pinName: "애기옷",
      },
      {
        commentContent: "ㅁㅇㄹ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "ㅁㅇㄴㄻㄴㅇㄹ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: null,
        pinNum: 0,
        pinName: null,
      },
      {
        commentContent: "ㅂㅈㄷㄱㅂㅈㄷㄱ",
        accountNickname: "난재",
        accountPhoto: "",
        commentLink: "",
        pinId: 4,
        pinNum: 2,
        pinName: "애기옷",
      },
    ],
  },
};
export const SubmitCommentData = {};
