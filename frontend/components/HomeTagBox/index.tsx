import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import color from "../../styles/theme";
import { useRouter } from "next/router";

const Container = styled.div<BoxProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 400px;
  color: blue;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ColorFrame = styled.div<BoxProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.frameOpacity};
  transition: all 0.35s;
`;

const FunctionFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
const ContentFrame = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.div`
  position: relative;
  width: ${(props) => (props.boxImageSize === "default" ? `100%` : `80%`)};
  height: ${(props) => (props.boxImageSize === "default" ? `100%` : `80%`)};
  transition: all 1s;
  margin-bottom: -50px;
`;

const TextBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  transition: all 0.35s;
  @media only screen and (min-width: 768px) {
    bottom: 30px;
    left: 30px;
  }
  @media only screen and (min-width: 1280px) {
    bottom: 50px;
    left: 50px;
  }
`;

const TagCountText = styled.div<BoxProps>`
  font-size: 16px;
  font-weight: 800;
  color: ${color.black.default};
  opacity: 1;
  transition: all 0.35s;
  font-family: "Darker Grotesque", sans-serif;
  @media only screen and (min-width: 768px) {
    padding-left: 4px;
  }
  @media only screen and (min-width: 1280px) {
    padding-left: 7px;
  }
`;

const TagTitleText = styled.div<BoxProps>`
  z-index: 1;
  font-family: "Black Han Sans", sans-serif;
  transition: all 0.35s;
  line-height: 0px;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
    margin-top: -10px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 80px;
    margin-top: 0px;
  }
`;

const ExploreText = styled.div<BoxProps>`
  font-weight: 900;
  padding-left: 5px;
  transition: all 0.35s;
  letter-spacing: -1px;
  color: ${color.white.default};
  font-family: "Darker Grotesque", sans-serif;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 28px;
  }
`;

type BoxProps = {
  boxBgColor?: string;
  boxFrameColor?: string;
  frameOpacity?: number;
  boxBgImage?: string;
  boxImagePosition?: string;
  boxCountText?: number;
  boxTitleText?: string;
  boxScrollObs?: number;
  scrollTop?: number;
  boxImageSize?: string;
};

const index = ({
  boxBgColor = "white",
  boxFrameColor = "black",
  boxBgImage = "",
  boxCountText = 0,
  boxTitleText = "태그",
  boxImagePosition = "",
  boxScrollObs = 0,
  scrollTop = 0,
  boxImageSize = "default",
}: BoxProps) => {
  const [frameOpacity, setFrameOpacity] = useState<number>(0);

  const router = useRouter();

  const onMouseOver = (): void => {
    setFrameOpacity(1);
  };

  const onMouseLeave = (): void => {
    setFrameOpacity(0);
  };

  return (
    <Container
      onClick={() => {
        router.push(`/search/${boxTitleText}`);
      }}
      style={{ backgroundColor: boxBgColor }}
    >
      <ColorFrame
        style={{ backgroundColor: boxFrameColor }}
        {...{ frameOpacity }}
      ></ColorFrame>
      <ContentFrame>
        <ImageBox
          style={
            boxScrollObs > scrollTop
              ? { opacity: 0 }
              : { opacity: 1, marginBottom: 0 }
          }
          boxImageSize={boxImageSize}
        >
          {boxBgImage !== "" ? (
            <Image
              src={boxBgImage}
              layout="fill"
              objectPosition={boxImagePosition}
              objectFit="contain"
              quality={100}
            />
          ) : null}
        </ImageBox>
        <TextBox>
          <TagCountText
            style={{
              marginBottom: frameOpacity === 1 ? "30px" : "45px",
              opacity: frameOpacity === 1 ? 0 : 1,
            }}
          >
            {boxCountText} PHOTOS
          </TagCountText>
          <TagTitleText
            style={{
              marginBottom: frameOpacity === 1 ? "15px" : "0px",
              color:
                frameOpacity === 1 ? color.white.default : color.black.default,
            }}
          >
            {boxTitleText}
          </TagTitleText>
          <ExploreText style={{ opacity: frameOpacity === 1 ? 1 : 0 }}>
            Explore
          </ExploreText>
        </TextBox>
      </ContentFrame>
      <FunctionFrame
        onMouseOver={(): void => onMouseOver()}
        onMouseLeave={(): void => onMouseLeave()}
      ></FunctionFrame>
    </Container>
  );
};

export default index;
