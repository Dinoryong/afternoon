import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import UserModalTop from "../UserModal/UserModalTop";
import LoginMiddle from "./LoginMiddle";
import UserModalBottom from "../UserModal/UserModalBottom";
import UserModalFoot from "../UserModal/UserModalFoot";
import { useSelector, useDispatch } from "react-redux";
import AuthMiddle from "./AuthMiddle";

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 10px;
`;

const Xbutton = styled.div`
  width: 17px;
  height: 17px;
  background-color: "transparent";
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
`;

const useCounter = () => {
  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };
  return { toggle };
};

const index = () => {
  const [authState, setAuthState] = useState(0);
  const [currentEmail, setCurrentEmail] = useState("");

  const { toggle } = useCounter();

  return (
    <Container>
      <Xbutton onClick={toggle}>
        <Image
          src="/assets/icons/x_mark.png"
          layout="fill"
          objectFit="contain"
        ></Image>
      </Xbutton>
      <UserModalTop></UserModalTop>
      {authState === 0 ? (
        <LoginMiddle
          setAuthState={setAuthState}
          setCurrentEmail={setCurrentEmail}
        ></LoginMiddle>
      ) : (
        <AuthMiddle currentEmail={currentEmail}></AuthMiddle>
      )}
      <UserModalBottom
        bottomText="다른 SNS계정으로 로그인하기"
        snsText1="Facebook으로 로그인"
        snsText2="카카오톡으로 로그인"
        snsText3="Google로 로그인"
      ></UserModalBottom>
      <UserModalFoot footText="계정이 없으신가요? 회원가입하기"></UserModalFoot>
    </Container>
  );
};

export default index;
