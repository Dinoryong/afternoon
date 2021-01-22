import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div<BoxProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
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
  transition: 0.35s;
`;

type BoxProps = {
  boxBgColor?: string;
  boxFrameColor?: string;
  frameOpacity?: number;
};

const index = ({ boxBgColor = "white", boxFrameColor = "black" }: BoxProps) => {
  const [frameOpacity, setFrameOpacity] = useState<number>(0);

  const onMouseOver = (): void => {
    setFrameOpacity(1);
  };

  const onMouseLeave = (): void => {
    setFrameOpacity(0);
  };

  return (
    <Container style={{ backgroundColor: boxBgColor }}>
      <ColorFrame
        style={{ backgroundColor: boxFrameColor }}
        {...{ frameOpacity }}
        onMouseOver={(): void => onMouseOver()}
        onMouseLeave={(): void => onMouseLeave()}
      ></ColorFrame>
    </Container>
  );
};

export default index;
