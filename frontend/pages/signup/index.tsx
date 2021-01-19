import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Modal from "../../components/Modal"
// import Button from "../../components/Buttons"

const Container = styled.div`
  position: relative;
  /* margin-top: 80px; */
  height: 100%;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BgOpacityFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.3;
`;

const Content = styled.div`
  position: absolute;
  font-display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: 700;
  color: white;
`;

const index = () => {
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(function mount() {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", function () {
      setWindowHeight(window.innerHeight);
    });
  });

  return (
    <Container style={{ height: windowHeight }}>
      <BgOpacityFrame></BgOpacityFrame>
      <Content>
				안녕하세요
			</Content>
			<Modal>
				
			</Modal>
			
    </Container>
  );
};

export default index;
