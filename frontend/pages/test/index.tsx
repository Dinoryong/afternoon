import React, { useEffect, useState } from "react";
// import Authmodal from "../../components/Authmodal";
import styled from "@emotion/styled";
import { GET_SAMPLE, POST_SAMPLE } from "../api/hello";

const Container = styled.div`
  position: relative;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: 700;
  color: white;
`;

const SampleBtn = styled.div`
  display: flex;
  width: 200px;
  height: 80px;
  background-color: #fff;
  border: 2px solid black;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  align-items: center;
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
      {/* <BgOpacityFrame></BgOpacityFrame> */}
      {/* <Content>
        <Authmodal></Authmodal>
      </Content> */}
      <SampleBtn
        onClick={() => {
          GET_SAMPLE();
        }}
      >
        GET 테스트
      </SampleBtn>
      <SampleBtn
        onClick={() => {
          POST_SAMPLE({
            userAge: 30,
            userName: "이재욱",
            userEmail: "dngngn3045@naver.com",
          });
        }}
      >
        POST 테스트
      </SampleBtn>
    </Container>
  );
};

export default index;
