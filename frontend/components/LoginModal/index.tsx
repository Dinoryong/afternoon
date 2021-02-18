import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import Image from "next/image";
import UserModalTop from "../UserModal/UserModalTop";
import UserModalBottom from "../UserModal/UserModalBottom";
import UserModalFoot from "../UserModal/UserModalFoot";
import LoginMiddle from "./LoginMiddle";
import AuthMiddle from "./AuthMiddle";
import { useRouter } from "next/router";

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

const useStore = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return { toggle };
};

const index = () => {
  const [authState, setAuthState] = useState(0);
  const [currentEmail, setCurrentEmail] = useState("");

  const { toggle } = useStore();

  const router = useRouter();

  return (
    <Container>
      <Xbutton onClick={toggle}>
        <Image
          src="/assets/icons/x_mark.png"
          layout="fill"
          objectFit="contain"
        />
      </Xbutton>
      <UserModalTop />
      {authState === 0 ? (
        <LoginMiddle
          setAuthState={setAuthState}
          setCurrentEmail={setCurrentEmail}
        />
      ) : (
        <AuthMiddle currentEmail={currentEmail} />
      )}
      <UserModalBottom
        bottomText="다른 SNS계정으로 로그인하기"
        snsText1="Facebook으로 로그인"
        snsText2="카카오톡으로 로그인"
        snsText3="Google로 로그인"
      />
      <UserModalFoot
        footText="계정이 없으신가요? 회원가입하기"
        footOnClick={() => {
          router.push("/signup");
          toggle();
        }}
      />
    </Container>
  );
};

export default index;
