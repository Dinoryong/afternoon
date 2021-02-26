import React from "react";
import styled from "@emotion/styled";
import UserModalTop from "../UserModal/UserModalTop";
import SignupMiddle from "./SignupMiddle";
import UserModalBottom from "../UserModal/UserModalBottom";
import UserModalFoot from "../UserModal/UserModalFoot";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
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

const useStore = () => {
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return { toggle };
};

const index = () => {
  const router = useRouter();
  const { toggle } = useStore();

  return (
    <Container>
      <UserModalTop />
      <SignupMiddle />
      <UserModalBottom
        bottomText="다른 SNS계정으로 가입하기"
        snsText1="Facebook 계정으로 가입하기"
        snsText2="카카오 계정으로 가입하기"
        snsText3="Google 계정으로 가입하기"
      />
      <UserModalFoot
        footText="계정이 있으신가요? 로그인하기"
        footOnClick={() => {
          router.push("/home");
          toggle();
        }}
      />
    </Container>
  );
};

export default index;
