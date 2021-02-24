import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div<DemensionProps>`
  display: ${(props) =>
    !props.displayState && props.frameIndex !== 0 ? "none" : "unset"};
  position: absolute;
  left: ${(props) => (props.overIndex === props.frameIndex ? -20 : 0)}px;
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
        ? props.windowWidth - 36
        : (props.windowWidth - 36) * 2}px
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
  cursor: ${(props) =>
    props.frameIndex === props.currentIndex ? "default" : "pointer"};
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
  opacity: ${(props) => (props.frameIndex === props.currentIndex ? 0.2 : 0.5)};
  transition: opacity 0.3s;
`;

const HomeTextFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

type DemensionProps = {
  windowHeight?: number;
  windowWidth?: number;
  frameIndex?: number;
  currentIndex?: number;
  maxIndex?: number;
  overIndex?: number;
  displayState?: boolean;
  setOverIndex?: Function;
  setCurrentIndex?: Function;
  carouselSrc?: string;
  setDisplayState?: Function;
};

const index = ({
  windowHeight,
  windowWidth,
  maxIndex,
  displayState,
  frameIndex,
  overIndex,
  setOverIndex,
  currentIndex,
  setCurrentIndex,
  carouselSrc,
  setDisplayState,
}: DemensionProps) => {
  const commonProps = {
    windowHeight,
    windowWidth,
    currentIndex,
    maxIndex,
    overIndex,
    displayState,
    setDisplayState,
  };

  type FrameProps = {
    index: number;
  };

  const onMouseOver = ({ index }: FrameProps): void => {
    if (
      currentIndex === index - 1 ||
      (currentIndex === maxIndex && index === 0)
    ) {
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

  return (
    <Container
      onMouseOver={(): void => {
        onMouseOver({ index: frameIndex });
      }}
      onMouseLeave={(): void => {
        onMouseLeave({ index: frameIndex });
      }}
      onClick={(): void => {
        onMouseClick({ index: frameIndex });
      }}
      {...{
        ...commonProps,
        frameIndex,
      }}
    >
      <ImageFrame>
        <Image src={carouselSrc} layout="fill" objectFit="cover" />
        <BgOpacityFrame
          {...{
            ...commonProps,
            frameIndex,
          }}
        />
      </ImageFrame>
    </Container>
  );
};

export default index;
