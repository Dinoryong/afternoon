import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import color from "../../styles/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow-x: hidden;
  background-color: black;
`;

const ImageContainer = styled.div<DemensionProps>`
  display: ${(props) =>
    !props.displayState && props.frameIndex !== 0 ? "none" : "unset"};
  position: absolute;
  left: ${(props) => (props.overIndex === props.frameIndex ? -60 : 0)}px;
  width: 100%;
  height: 100%;
  transform: translateX(
    ${(props) =>
      props.currentIndex === props.frameIndex ||
      props.currentIndex - 1 === props.frameIndex ||
      (props.currentIndex === 0 && props.frameIndex === 3)
        ? 0
        : props.currentIndex + 1 === props.frameIndex ||
          props.currentIndex - props.maxIndex === props.frameIndex
        ? props.windowWidth - 128
        : (props.windowWidth - 128) * 2}px
  );
  z-index: ${(props) =>
    props.currentIndex === props.frameIndex
      ? 1
      : props.currentIndex + 1 === props.frameIndex ||
        props.currentIndex - props.maxIndex === props.frameIndex
      ? 2
      : 0};
  transition: transform
      ${(props) =>
        props.currentIndex === props.frameIndex ||
        props.currentIndex === props.frameIndex - 1 ||
        (props.currentIndex === props.maxIndex && props.frameIndex === 0)
          ? `.5s`
          : `0s`}
      cubic-bezier(0.45, 0.035, 0.045, 0.95),
    left 0.5s;
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BgOpacityFrame = styled.div<DemensionProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${color.black.default};
  opacity: ${(props) => (props.frameIndex === props.currentIndex ? 0.1 : 0.7)};
  cursor: ${(props) =>
    props.frameIndex === props.currentIndex ? "default" : "pointer"};
  transition: opacity 0.5s;
`;

type DemensionProps = {
  windowHeight?: number;
  windowWidth?: number;
  frameIndex?: number;
  currentIndex?: number;
  maxIndex?: number;
  overIndex?: number;
  displayState?: boolean;
};

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
    window.addEventListener("resize", function () {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    });
  });

  type FrameProps = {
    index: number;
  };

  const maxIndex: number = 3;

  const onMouseOver = ({ index }: FrameProps): void => {
    if (currentIndex === index - 1 || (currentIndex === 3 && index === 0)) {
      setOverIndex(index);
    }
  };

  const onMouseLeave = ({ index }: FrameProps): void => {
    setOverIndex(-1);
  };

  const onMouseClick = ({ index }: FrameProps): void => {
    setCurrentIndex(index);
    setOverIndex(-1);
  };

  const commonProps = {
    windowHeight,
    windowWidth,
    currentIndex,
    maxIndex,
    overIndex,
    displayState,
  };

  return (
    <Container style={{ height: windowHeight }}>
      <ImageContainer
        {...{
          ...commonProps,
          frameIndex: 0,
        }}
        onMouseOver={(): void => {
          onMouseOver({ index: 0 });
        }}
        onMouseLeave={(): void => {
          onMouseLeave({ index: 0 });
        }}
        onClick={(): void => {
          onMouseClick({ index: 0 });
        }}
      >
        <ImageFrame>
          <Image
            src={"/assets/images/home_bg_0.jpg"}
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
          <BgOpacityFrame
            {...{
              ...commonProps,
              frameIndex: 0,
            }}
          />
        </ImageFrame>
      </ImageContainer>
      <ImageContainer
        onMouseOver={(): void => {
          onMouseOver({ index: 1 });
        }}
        onMouseLeave={(): void => {
          onMouseLeave({ index: 1 });
        }}
        onClick={(): void => {
          onMouseClick({ index: 1 });
        }}
        {...{
          ...commonProps,
          frameIndex: 1,
        }}
      >
        <ImageFrame>
          <Image
            src={"/assets/images/home_bg_1.jpg"}
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
          <BgOpacityFrame
            {...{
              ...commonProps,
              frameIndex: 1,
            }}
          ></BgOpacityFrame>
        </ImageFrame>
      </ImageContainer>
      <ImageContainer
        onMouseOver={(): void => {
          onMouseOver({ index: 2 });
        }}
        onMouseLeave={(): void => {
          onMouseLeave({ index: 2 });
        }}
        onClick={(): void => {
          onMouseClick({ index: 2 });
        }}
        {...{
          ...commonProps,
          frameIndex: 2,
        }}
      >
        <ImageFrame>
          <Image
            src={"/assets/images/home_bg_2.jpg"}
            layout="fill"
            objectFit="cover"
          />
          <BgOpacityFrame
            {...{
              ...commonProps,
              frameIndex: 2,
            }}
          ></BgOpacityFrame>
        </ImageFrame>
      </ImageContainer>
      <ImageContainer
        onMouseOver={(): void => {
          onMouseOver({ index: 3 });
        }}
        onMouseLeave={(): void => {
          onMouseLeave({ index: 3 });
        }}
        onClick={(): void => {
          onMouseClick({ index: 3 });
        }}
        {...{
          ...commonProps,
          frameIndex: 3,
        }}
      >
        <ImageFrame>
          <Image
            src={"/assets/images/home_bg_3.jpg"}
            layout="fill"
            objectFit="cover"
          />
          <BgOpacityFrame
            {...{
              ...commonProps,
              frameIndex: 3,
            }}
          ></BgOpacityFrame>
        </ImageFrame>
      </ImageContainer>
    </Container>
  );
};

export default HomeTop;
