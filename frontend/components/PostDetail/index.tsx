import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import {
  GET_ONE_POST_LOGIN,
  GET_ONE_POST_LOGOUT,
  LIKE_POST,
  SUBMIT_COMMENT,
  UNLIKE_POST,
} from "../../pages/api/post";
import color from "../../styles/theme";
import ProfileTagBox from "../ProfileTagBox";
import Comment from "../Comment";
import SubmitComment from "./SubmitComment";
import PinModal from "../PinModal";

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px 20px;
`;

const ImageDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageBox = styled("img")`
  z-index: 2;
  max-width: 100%;
  max-height: 100%;
`;

const PinClickFrame = styled.div`
  z-index: 3;
  position: absolute;
  opacity: 1;
`;

const NewPinIcon = styled.div`
  z-index: 5;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${color.white.default};
  /* border: 2px solid ${color.white.default}; */
  top: 50%;
  left: 50%;
  cursor: pointer;
`;

const NewPinMini = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${color.white.default};
`;

const ArrowLeft = styled.div`
  position: absolute;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  left: -16px;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  position: absolute;
  z-index: 6;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  right: -16px;
  cursor: pointer;
`;

const OpenInfoFrame = styled.div`
  position: absoulte;
  width: 100%;
  height: 100%;
  cursor: ${(props) => (props.infoState ? "zoom-out" : "zoom-in")};
`;

const InfoWrapper = styled.div`
  min-width: 400px;
  width: 400px;
  height: 100%;
  padding: 0px 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoDiv = styled.div`
  overflow-y: scroll;
`;

const InfoTopDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContentDiv = styled.div`
  padding: 0px 8px;
`;

const InfoCommentDiv = styled.div`
  padding: 0px 8px;
`;

const SubmitCommentDiv = styled.div`
  min-height: 80px;
  height: 80px;
`;

const BoxLine = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: ${color.gray.default};
  margin: 10px 0px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
`;

const ProfileRow = styled.div`
  display: flex;
`;

const ProfileLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const ProfileNickname = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const PostCreated = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${color.gray.dark};
`;

const TagInfo = styled.div`
  display: flex;
  margin-top: 12px;
`;

const PostTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const PostContent = styled.div`
  margin: 12px 0px 24px 0px;
`;

const PostLikeDiv = styled.div`
  display: flex;
`;

const PostLikeImage = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
`;

const PostLikeText = styled.div`
  color: ${color.gray.dark};
`;

const CommentTagDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
`;

const CommentBackBox = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  margin-top: 1px;
`;

const useStore = () => {
  const toggleId = useSelector((state: RootStateOrAny) => state.post.toggleId);
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const togglePost = async () => {
    dispatch({ type: "TOGGLE_POST" });
  };

  return { toggleId, loginState, toggle, togglePost };
};

const index = ({ windowWidth, windowHeight }) => {
  const { toggleId, loginState, toggle, togglePost } = useStore();

  const [getOnePostApiState, setGetOnePostApiState] = useState(false);
  const [postDetailData, setPostDetailData] = useState({});
  const [photoList, setPhotoList] = useState([]);
  const [maxPhoto, setMaxPhoto] = useState(0);

  const [currentImg, setCurrentImg] = useState(0);
  const [imgDim, setImgDim] = useState({ offsetWidth: 0, offsetHeight: 0 });
  const [infoState, setInfoState] = useState(false);
  const [likeBtnState, setLikeBtnState] = useState({});

  const [pinList, setPinList] = useState([]);
  const [currentPin, setCurrentPin] = useState({
    pinId: -1,
    pinName: "전체",
  });

  const [refreshState, setRefreshState] = useState(false);

  useEffect(() => {
    let pinImage = document.getElementById(`pinImage${currentImg}`);
    if (pinImage !== null) {
      let { offsetWidth, offsetHeight } = pinImage;
      setImgDim({ offsetWidth, offsetHeight });
    }
  }, [currentImg, infoState]);

  useEffect(() => {
    setMaxPhoto(photoList.length);
  }, [photoList]);

  useEffect(() => {
    const RequestGetOnePostLogin = async () => {
      const getOnePostLoginReq = toggleId;
      const getOnePostLoginConfig = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        },
      };

      const result = await GET_ONE_POST_LOGIN(
        getOnePostLoginReq,
        getOnePostLoginConfig
      );
      console.log(result);

      if (result.status === 200) {
        setPinList(result.data.pins);
        setPhotoList(result.data.postsPhotos);
        setPostDetailData(result.data);
        setLikeBtnState(result.data.likeState);
      }
    };

    const RequestGetOnePostLogout = async () => {
      const getOnePostLogoutReq = toggleId;

      const result = await GET_ONE_POST_LOGOUT(getOnePostLogoutReq);
      console.log(result);

      if (result.status === 200) {
        setPinList(result.data.pins);
        setPhotoList(result.data.postsPhotos);
        setPostDetailData(result.data);
        setLikeBtnState(result.data.likeState);
      }
    };

    if (!getOnePostApiState) {
      setGetOnePostApiState(true);
      if (loginState) {
        RequestGetOnePostLogin();
      } else {
        RequestGetOnePostLogout();
      }
    }

    const resizeHandler = () => {
      let pinImage = document.getElementById(`pinImage${currentImg}`);
      if (pinImage !== null) {
        let { offsetWidth, offsetHeight } = pinImage;
        setImgDim({ offsetWidth, offsetHeight });
      }
    };

    // Warning: Maximum update depth exceeded
    if (imgDim && imgDim.offsetHeight === 0 && imgDim.offsetWidth === 0) {
      resizeHandler();
    }

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  const likePostOnClick = async () => {
    const likePostReq = { postId: postDetailData.postsId };
    const likePostConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };
    setLikeBtnState(true);
    const result = await LIKE_POST(likePostReq, likePostConfig);
    console.log(result);
  };

  const unlikePostOnClick = async () => {
    const unlikePostReq = postDetailData.postsId;
    const unlikePostConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };
    setLikeBtnState(false);
    const result = await UNLIKE_POST(unlikePostReq, unlikePostConfig);
    console.log(result);
  };

  const postLikeBtnOnClick = () => {
    const logoutClick = () => {
      togglePost();
      toggle();
    };

    !loginState
      ? logoutClick()
      : likeBtnState
      ? unlikePostOnClick()
      : likePostOnClick();
  };

  const pinCircleOnClick = (pl) => {
    setCurrentPin(
      currentPin.pinId === pl.pinId
        ? {
            pinId: -1,
            pinName: "전체",
          }
        : pl
    );
    setInfoState(true);
  };

  const [inputComment, setInputComment] = useState("");
  const [inputLink, setInputLink] = useState("");

  const requestSubmitComment = async () => {
    const submitCommentReq = {
      postsId: postDetailData.postsId,
      pinName: currentPin.pinName,
      commentContent: inputComment,
      commentLink: currentPin.pinId === -1 ? "" : inputLink,
      pinId: currentPin.pinId,
    };
    const submitCommentConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await SUBMIT_COMMENT(submitCommentReq, submitCommentConfig);
    console.log(result);

    if (result.status === 200) {
      togglePost();
    }
  };

  return (
    <>
      {!refreshState && (
        <Container
          style={{
            width: `${windowWidth - 240}px`,
            height: `${windowHeight - 80}px`,
          }}
        >
          <Wrapper>
            {postDetailData && Object.keys(postDetailData).length > 0 && (
              <ImageDiv>
                {imgDim &&
                  imgDim.offsetHeight !== 0 &&
                  imgDim.offsetWidth !== 0 && (
                    <PinClickFrame
                      style={{
                        width: imgDim.offsetWidth,
                        height: imgDim.offsetHeight,
                      }}
                    >
                      <OpenInfoFrame
                        onClick={() => setInfoState(!infoState)}
                        infoState={infoState}
                      ></OpenInfoFrame>
                      {pinList &&
                        pinList.length > 0 &&
                        pinList.map((pl, index) => {
                          return (
                            <>
                              <NewPinIcon
                                style={
                                  currentImg === pl.pinNum - 1
                                    ? {
                                        top: `${
                                          pl.pinLocY -
                                          2000 / imgDim.offsetHeight
                                        }%`,
                                        left: `${
                                          pl.pinLocX - 2000 / imgDim.offsetWidth
                                        }%`,
                                      }
                                    : {
                                        display: "none",
                                        top: `${
                                          pl.pinLocY -
                                          2000 / imgDim.offsetHeight
                                        }%`,
                                        left: `${
                                          pl.pinLocX - 2000 / imgDim.offsetWidth
                                        }%`,
                                      }
                                }
                                key={index}
                                onClick={() => pinCircleOnClick(pl)}
                              >
                                {currentImg === pl.pinNum - 1 &&
                                  currentPin.pinId === pl.pinId && (
                                    <PinModal
                                      key={index}
                                      pinData={pl}
                                      accountNickname={
                                        postDetailData.postsWriter
                                          .accountNickname
                                      }
                                    ></PinModal>
                                  )}
                                <Image
                                  src={
                                    currentPin.pinId === pl.pinId
                                      ? "/assets/icons/eye_open.png"
                                      : "/assets/icons/eye_close.png"
                                  }
                                  width={36}
                                  height={36}
                                  objectFit="contain"
                                ></Image>
                              </NewPinIcon>
                            </>
                          );
                        })}
                    </PinClickFrame>
                  )}
                {photoList && Object.keys(photoList).length > 1 && (
                  <ArrowLeft
                    onClick={() =>
                      setCurrentImg(
                        currentImg === 0 ? maxPhoto - 1 : currentImg - 1
                      )
                    }
                  >
                    <Image
                      src={"/assets/icons/arrow_left.png"}
                      width="18"
                      height="18"
                      objectFit="contain"
                    ></Image>
                  </ArrowLeft>
                )}
                {photoList &&
                  Object.keys(photoList).length > 0 &&
                  photoList.map((pl, index) => {
                    return (
                      <ImageBox
                        key={index}
                        style={currentImg === index ? {} : { display: "none" }}
                        id={`pinImage${index}`}
                        src={pl}
                      ></ImageBox>
                    );
                  })}
                {photoList && Object.keys(photoList).length > 1 && (
                  <ArrowRight
                    onClick={() =>
                      setCurrentImg(
                        currentImg === maxPhoto - 1 ? 0 : currentImg + 1
                      )
                    }
                  >
                    <Image
                      src={"/assets/icons/arrow_right.png"}
                      width="18"
                      height="18"
                      objectFit="contain"
                    ></Image>
                  </ArrowRight>
                )}
              </ImageDiv>
            )}
            {infoState &&
              postDetailData &&
              Object.keys(postDetailData).length > 0 && (
                <InfoWrapper>
                  <InfoDiv>
                    <InfoTopDiv>
                      <ProfileInfo>
                        <ProfileRow>
                          <ProfileLeft>
                            <ProfileImage>
                              <Image
                                className="next_border_image circle"
                                src={
                                  postDetailData.postsWriter.accountPhoto === ""
                                    ? "/assets/icons/eye_open.png"
                                    : postDetailData.postsWriter.accountPhoto
                                }
                                layout="fill"
                                objectFit="cover"
                              ></Image>
                            </ProfileImage>
                          </ProfileLeft>
                          <ProfileRight>
                            <ProfileNickname>
                              {postDetailData.postsWriter.accountNickname}
                            </ProfileNickname>
                            <PostCreated>
                              {postDetailData.postsWriteTime.slice(0, 4)}년{" "}
                              {postDetailData.postsWriteTime.slice(5, 7)}월{" "}
                              {postDetailData.postsWriteTime.slice(8, 10)}일
                            </PostCreated>
                          </ProfileRight>
                        </ProfileRow>
                        <TagInfo>
                          {postDetailData.tags.map((t, index) => {
                            return (
                              <ProfileTagBox
                                key={index}
                                tagId={t.tagId}
                                tagMargin={"0px 8px 0px 0px"}
                                togglePost={togglePost}
                              ></ProfileTagBox>
                            );
                          })}
                        </TagInfo>
                      </ProfileInfo>
                    </InfoTopDiv>
                    <BoxLine />
                    <InfoContentDiv>
                      <PostTitle>{postDetailData.postsTitle}</PostTitle>
                      <PostContent>{postDetailData.postsContents}</PostContent>
                      <PostLikeDiv>
                        <PostLikeImage onClick={postLikeBtnOnClick}>
                          <Image
                            src={
                              !loginState
                                ? "/assets/icons/heart_empty.png"
                                : likeBtnState
                                ? "/assets/icons/heart_fill_red.png"
                                : "/assets/icons/heart_empty.png"
                            }
                            layout="fill"
                            objectFit="contain"
                          ></Image>
                        </PostLikeImage>
                        <PostLikeText>
                          {!loginState
                            ? postDetailData.postsLikeCnt
                            : likeBtnState
                            ? postDetailData.postsLikeCnt + 1
                            : postDetailData.postsLikeCnt}
                          명이 좋아합니다.
                        </PostLikeText>
                      </PostLikeDiv>
                    </InfoContentDiv>
                    <BoxLine />
                    <InfoCommentDiv>
                      {currentPin && currentPin.pinId !== -1 && (
                        <CommentTagDiv
                          onClick={() => {
                            setCurrentPin({
                              pinId: -1,
                              pinName: "전체",
                            });
                          }}
                        >
                          <CommentBackBox>
                            <Image
                              src="/assets/icons/arrow_left.png"
                              layout="fill"
                            ></Image>
                          </CommentBackBox>
                          전체 댓글로 돌아가기
                        </CommentTagDiv>
                      )}
                      {currentPin &&
                        currentPin.pinId === -1 &&
                        postDetailData.comments.map((postc, index) => {
                          return (
                            <Comment
                              key={index}
                              currentPin={currentPin}
                              commentData={postc}
                            ></Comment>
                          );
                        })}
                      {currentPin &&
                        currentPin.pinId !== -1 &&
                        currentPin.comments.map((pinc, index) => {
                          return (
                            <Comment
                              key={index}
                              currentPin={currentPin}
                              commentData={pinc}
                            ></Comment>
                          );
                        })}
                    </InfoCommentDiv>
                  </InfoDiv>
                  <SubmitCommentDiv>
                    <BoxLine />
                    <SubmitComment
                      loginState={loginState}
                      toggle={toggle}
                      togglePost={togglePost}
                      currentPin={currentPin}
                      inputComment={inputComment}
                      setInputComment={setInputComment}
                      inputLink={inputLink}
                      setInputLink={setInputLink}
                      requestSubmitComment={requestSubmitComment}
                    />
                  </SubmitCommentDiv>
                </InfoWrapper>
              )}
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default index;
