import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HomeCarousel from "../../components/HomeCarousel";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  background-color: black;
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
        carouselSrc="/assets/images/home_bg_0.jpg"
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
        carouselSrc="/assets/images/home_bg_1.jpg"
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
        carouselSrc="/assets/images/home_bg_2.jpg"
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
        carouselSrc="/assets/images/home_bg_3.jpg"
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
    </Container>
  );
};

export default HomeTop;
