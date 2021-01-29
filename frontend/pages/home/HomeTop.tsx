import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HomeCarousel from "../../components/HomeCarousel/index";
import color from "../../styles/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  background-color: black;
`;

const HomeTextFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 100px;
  /* font-weight: 700; */
  margin-left: 60px;
  margin-bottom: 120px;
  z-index: 1;
  font-family: "Black Han Sans", sans-serif;
`;

const TextBox = styled.div`
  margin-bottom: -20px;
  color: ${color.white.default};
`;

const TextChangeFrame = styled.div`
  position: relative;
  width: 900px;
  height: 120px;
`;

const TextBoxOpacity = styled.div`
  position: absolute;
  display: flex;
  color: ${color.white.default};
  opacity: 0;
  margin-top: 40px;
  transition: all 0.5s;
  text-shadow: 0px 0 white, 3px 3px white, 3px 3px white, 0 0px white;
`;

const SwiperBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`;

const SwiperPoint = styled.div`
  margin: 0px 10px;
  background-color: ${color.gray.light};
  opacity: 0.2;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.5s;
`;

const HomeTop = () => {
  const [windowHeight, setWindowHeight] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const [overIndex, setOverIndex] = useState<number>(-1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [displayState, setDisplayState] = useState<boolean>(false);

  useEffect(function mount() {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);

    setTimeout(() => {
      setDisplayState(true);
    }, 1);

    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    window.addEventListener("resize", resizeHandler);

    return cleanup;
  });

  const maxIndex: number = 3;

  return (
    <Container style={{ height: windowHeight }}>
      <HomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={0}
        carouselSrc="/assets/images/home_bg_11.jpg"
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <HomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={1}
        carouselSrc="/assets/images/home_bg_5.jpg"
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <HomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={2}
        carouselSrc="/assets/images/home_bg_9.jpg"
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <HomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={3}
        carouselSrc="/assets/images/home_bg_7.jpg"
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <HomeTextFrame>
        <TextDiv>
          <TextBox>당신의</TextBox>
          <TextChangeFrame>
            <TextBoxOpacity
              style={
                currentIndex === 0
                  ? { opacity: 1, color: color.yellow.default, marginTop: 0 }
                  : null
              }
            >
              작업공간을 공유하세요
            </TextBoxOpacity>
            <TextBoxOpacity
              style={
                currentIndex === 1
                  ? { opacity: 1, color: color.red.light, marginTop: 0 }
                  : null
              }
            >
              인테리어를 공유하세요
            </TextBoxOpacity>
            <TextBoxOpacity
              style={
                currentIndex === 2
                  ? { opacity: 1, color: color.blue.default, marginTop: 0 }
                  : null
              }
            >
              컬렉션을 공유하세요
            </TextBoxOpacity>
            <TextBoxOpacity
              style={
                currentIndex === 3
                  ? { opacity: 1, color: color.pink.default, marginTop: 0 }
                  : null
              }
            >
              취미를 공유하세요
            </TextBoxOpacity>
          </TextChangeFrame>
          <SwiperBox>
            <SwiperPoint
              style={
                currentIndex === 0
                  ? { opacity: 1, backgroundColor: color.yellow.default }
                  : null
              }
            />
            <SwiperPoint
              style={
                currentIndex === 1
                  ? { opacity: 1, backgroundColor: color.red.light }
                  : null
              }
            />
            <SwiperPoint
              style={
                currentIndex === 2
                  ? { opacity: 2, backgroundColor: color.blue.default }
                  : null
              }
            />
            <SwiperPoint
              style={
                currentIndex === 3
                  ? { opacity: 3, backgroundColor: color.pink.default }
                  : null
              }
            />
          </SwiperBox>
        </TextDiv>
      </HomeTextFrame>
    </Container>
  );
};

export default HomeTop;
