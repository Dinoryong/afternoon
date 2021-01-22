import React from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

// 가장 바깥 구획 나누기
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  /* height: 220px; */
  /* margin: 2px 0px; */
  /* background-color: pink; */
`;

// 내부 컨텐츠 시작
const InputName = styled.input`
  display: flex;
	width: 300px;
	height: 40px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  ::placeholder{
    font-size: 12px;
  }
  font-size: 12px;
  :focus {
    outline: none
  }
`;

const InputNickname = styled.input`
  display: flex;
	width: 300px;
	height: 40px;
	margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  ::placeholder{
    font-size: 12px;
  }
  font-size: 12px;
  :focus {
    outline: none
  }
`;

const InputEmail = styled.input`
  display: flex;
	width: 300px;
	height: 40px;
	/* margin: 5px; */
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  ::placeholder{
    font-size: 12px;
    /* padding-left: 10px; */
  }
  font-size: 12px;
  :focus {
    outline: none
  }
  margin-bottom: 10px;
`;

const SignupButton = styled.div`
  display: flex;
	width: 300px;
	height: 45px;
	/* background-color: red; */
	/* margin: 5px; */
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const SignupMiddle = () => {
  return (
        <Container>
          <InputName placeholder={"이름을 입력해주세요. (영문, 한글 2글자 이상)"}></InputName>
          <InputNickname placeholder={"닉네임을 입력해주세요. (영문, 한글 2글자 이상)"}></InputNickname>
          <InputEmail placeholder={"이메일을 입력해주세요. (example@site.com)"}></InputEmail>
          <SignupButton>
            <Button
              btnBgColor={color.red.default}
              btnWidth="300px"
              // btnMarginRight="40px"
              btnText="회원가입"
              btnTextColor={color.white.default}
              btnHeight="40px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={color.red.dark}
              btnHoverTextColor={color.white.default}/>
          </SignupButton>
        </Container>
  );
};

export default SignupMiddle;
