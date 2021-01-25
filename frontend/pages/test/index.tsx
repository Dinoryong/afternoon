import React, { useEffect, useState } from "react";
// import Authmodal from "../../components/Authmodal";
import styled from "@emotion/styled";
import { GET_SAMPLE, POST_SAMPLE } from "../api/hello";
import {
  AUTO_LOGIN,
  CHECK_EMAIL,
  CONFIRM_LOGIN,
  REQUEST_LOGIN,
  LOG_OUT,
  SIGN_UP,
} from "../api/user";

const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
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
  width: 300px;
  height: 120px;
  background-color: #fff;
  border: 2px solid black;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const index = () => {
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(function mount() {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", function () {
      setWindowHeight(window.innerHeight);
    });
  });

  const signupProps = {
    accountName: "리재욱",
    accountEmail: "dngngn3045@gmail.com",
    accountNickname: "재욱",
  };

  const loginProps = {
    act: "login-request",
    accountEmail: "dev.nanjae@gmail.com",
  };

  const checkProps1 = {
    act: "check-authKey-off",
    accountEmail: "dev.nanjae@gmail.com",
    accountAuthKey: "6x63anje",
  };

  const checkProps2 = {
    act: "check-authKey-on",
    accountEmail: "dev.nanjae@gmail.com",
    accountAuthKey: "6x63anje",
  };

  // useEffect(function mount(): void {
  //   if (window.sessionStorage.getItem("authToken") !== null) {
  //     AUTO_LOGIN();
  //   }
  // });

  return (
    <Container style={{ height: windowHeight }}>
      <SampleBtn onClick={() => GET_SAMPLE()}>서버 테스트</SampleBtn>
      <SampleBtn onClick={() => SIGN_UP(signupProps)}>
        회원가입 테스트
      </SampleBtn>
      <SampleBtn onClick={() => REQUEST_LOGIN(loginProps)}>
        이메일로 인증번호 보내기
      </SampleBtn>
      <SampleBtn onClick={() => CHECK_EMAIL(checkProps1)}>
        인증번호 확인 요청
      </SampleBtn>
      <SampleBtn onClick={() => CONFIRM_LOGIN(checkProps2)}>
        로그인 요청
      </SampleBtn>
      <SampleBtn onClick={() => AUTO_LOGIN()}>자동 로그인 테스트</SampleBtn>
      <SampleBtn onClick={() => LOG_OUT()}>로그아웃 테스트</SampleBtn>
    </Container>
  );
};

export default index;
