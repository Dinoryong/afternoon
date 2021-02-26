import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HomeTop from "./HomeTop";
import HomeBottom from "./HomeBottom";
import HomeTopSmall from "./HomeTopSmall";
import HomeBottomSmall from "./HomeBottomSmall";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const index = () => {
  const [windowHeight, setWindowHeight] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();
  const [displayState, setDisplayState] = useState<boolean>(false);

  useEffect(function mount() {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    resizeHandler();

    setTimeout(() => {
      setDisplayState(true);
    }, 1);

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  return (
    <Container>
      {windowWidth > 768 && (
        <HomeTop
          windowHeight={windowHeight}
          windowWidth={windowWidth}
          displayState={displayState}
          setDisplayState={setDisplayState}
        ></HomeTop>
      )}{" "}
      {windowWidth <= 768 && (
        <HomeTopSmall
          windowHeight={windowHeight}
          windowWidth={windowWidth}
          displayState={displayState}
          setDisplayState={setDisplayState}
        ></HomeTopSmall>
      )}
      {windowWidth > 768 && <HomeBottom></HomeBottom>}
      {windowWidth <= 768 && <HomeBottomSmall></HomeBottomSmall>}
    </Container>
  );
};

export default index;
