import React from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import UserModalTop from "../UserModal/UserModalTop";
import SignupMiddle from "./SignupMiddle";
import UserModalBottom from "../UserModal/UserModalBottom";
import UserModalFoot from "../UserModal/UserModalFoot";

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

const index = () => {
  return (
    <Container>
      <UserModalTop></UserModalTop>
      <SignupMiddle></SignupMiddle>
      <UserModalBottom
        bottomText="다른 SNS계정으로 가입하기"
        snsText1="Facebook으로 가입하기"
        snsText2="카카오톡으로 가입하기"
        snsText3="Google로 가입하기"
      ></UserModalBottom>
      <UserModalFoot footText="계정이 없으신가요? 회원가입하기"></UserModalFoot>
    </Container>
  );
};

export default index;
