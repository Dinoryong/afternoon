import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { GET_ONE_POST } from "../../pages/api/post";
import color from "../../styles/theme";
import ProfileTagBox from "../ProfileTagBox";
import Comment from "../Comment";

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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${color.white.default};
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
  z-index: 6;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  left: 4px;
  top: 50%;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  z-index: 6;
  position: absolute;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  right: 4px;
  top: 50%;
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

const PinSelectDiv = styled.div``;

const useCounter = () => {
  const toggleId = useSelector((state: RootStateOrAny) => state.post.toggleId);

  return { toggleId };
};

const index = ({ windowWidth, windowHeight }) => {
  const { toggleId } = useCounter();

  const [getOnePostApiState, setGetOnePostApiState] = useState(false);
  const [postDetailData, setPostDetailData] = useState({});
  const [photoList, setPhotoList] = useState([]);
  const [maxPhoto, setMaxPhoto] = useState(0);

  const [currentImg, setCurrentImg] = useState(0);
  const [imgDim, setImgDim] = useState({ offsetWidth: 0, offsetHeight: 0 });
  const [infoState, setInfoState] = useState(false);
  const [postLikeState, setPostLikeState] = useState(false);

  const [pinList, setPinList] = useState([]);

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
    const RequestGetOnePost = async () => {
      const getPostDetailReq = toggleId;

      const result = await GET_ONE_POST(getPostDetailReq);
      console.log(result);

      if (result.status === 200) {
        setPinList(result.data.pins);
        setPhotoList(result.data.postsPhotos);
        setPostDetailData(result.data);
        setPostLikeState(result.data.likeState);
      }
    };

    if (!getOnePostApiState) {
      setGetOnePostApiState(true);
      RequestGetOnePost();
    }

    const resizeHandler = () => {
      let pinImage = document.getElementById(`pinImage${currentImg}`);
      if (pinImage !== null) {
        let { offsetWidth, offsetHeight } = pinImage;
        setImgDim({ offsetWidth, offsetHeight });
      }
    };

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    if (imgDim && imgDim.offsetHeight === 0 && imgDim.offsetWidth === 0) {
      resizeHandler();
    }

    return cleanup;
  });

  return (
    <Container
      style={{
        width: `${windowWidth - 240}px`,
        height: `${windowHeight - 80}px`,
      }}
    >
      <Wrapper>
        {postDetailData && Object.keys(postDetailData).length > 0 && (
          <ImageDiv>
            {imgDim && imgDim.offsetHeight !== 0 && imgDim.offsetWidth !== 0 && (
              <PinClickFrame
                style={{
                  width: imgDim.offsetWidth,
                  height: imgDim.offsetHeight,
                }}
              >
                <OpenInfoFrame
                  onClick={() => {
                    setInfoState(!infoState);
                  }}
                  infoState={infoState}
                ></OpenInfoFrame>
                {pinList &&
                  pinList.length > 0 &&
                  pinList.map((pl, index) => {
                    return (
                      <NewPinIcon
                        style={
                          currentImg === pl.pinNum - 1
                            ? {
                                top: `${pl.pinLocY}%`,
                                left: `${pl.pinLocX}%`,
                              }
                            : {
                                display: "none",
                                top: `${pl.pinLocY}%`,
                                left: `${pl.pinLocX}%`,
                              }
                        }
                        key={index}
                      >
                        <NewPinMini></NewPinMini>
                      </NewPinIcon>
                    );
                  })}
              </PinClickFrame>
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
            <ArrowLeft
              onClick={() => {
                setCurrentImg(currentImg === 0 ? maxPhoto - 1 : currentImg - 1);
              }}
            >
              <Image
                src={"/assets/icons/arrow_left.png"}
                width="24"
                height="24"
                objectFit="contain"
              ></Image>
            </ArrowLeft>
            <ArrowRight
              onClick={() => {
                setCurrentImg(currentImg === maxPhoto - 1 ? 0 : currentImg + 1);
              }}
            >
              <Image
                src={"/assets/icons/arrow_right.png"}
                width="24"
                height="24"
                objectFit="contain"
              ></Image>
            </ArrowRight>
          </ImageDiv>
        )}
        {infoState && postDetailData && Object.keys(postDetailData).length > 0 && (
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
                              ? "/assets/logos/pinset_logo_black.png"
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
                      <PostCreated>{postDetailData.postsWriteTime}</PostCreated>
                    </ProfileRight>
                  </ProfileRow>
                  <TagInfo>
                    {postDetailData.tags.map((t, index) => {
                      return (
                        <ProfileTagBox
                          tagId={t.tagId}
                          tagMargin={"0px 8px 0px 0px"}
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
                  <PostLikeImage
                    onClick={() => {
                      setPostLikeState(!postLikeState);
                    }}
                  >
                    <Image
                      src={
                        postLikeState
                          ? "/assets/icons/heart_fill_red.png"
                          : "/assets/icons/heart_empty.png"
                      }
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </PostLikeImage>
                  <PostLikeText>
                    {postLikeState
                      ? `회원님 외 ${postDetailData.postsLikeCnt}명이 좋아합니다.`
                      : `${postDetailData.postsLikeCnt}명이 좋아합니다.`}
                  </PostLikeText>
                </PostLikeDiv>
              </InfoContentDiv>
              <BoxLine />
              <InfoCommentDiv>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
                <Comment></Comment>
              </InfoCommentDiv>
            </InfoDiv>
            <SubmitCommentDiv>
              <BoxLine />
            </SubmitCommentDiv>
          </InfoWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default index;
