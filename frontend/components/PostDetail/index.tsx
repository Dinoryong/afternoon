import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { GET_ONE_POST } from "../../pages/api/post";
import color from "../../styles/theme";

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
`;

const NewPinMini = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${color.white.default};
`;

const PinFrame = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ArrowLeft = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  left: 0%;
  top: 50%;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  right: 0%;
  top: 50%;
  cursor: pointer;
`;

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

  const [pinList, setPinList] = useState([]);

  useEffect(() => {
    let pinImage = document.getElementById(`pinImage${currentImg}`);
    if (pinImage !== null) {
      let { offsetWidth, offsetHeight } = pinImage;
      setImgDim({ offsetWidth, offsetHeight });
    }
  }, [currentImg]);

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
                // onClick={onClickPinFrame}
              >
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
                layout="fill"
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
                layout="fill"
                objectFit="contain"
              ></Image>
            </ArrowRight>
          </ImageDiv>
        )}
      </Wrapper>
    </Container>
  );
};

export default index;
