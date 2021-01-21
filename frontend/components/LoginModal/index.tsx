import React from "react";
import Button from "../Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Modal = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
	flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  /* opacity: 0.92; */
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 10px;
`;

// 가장 바깥 구획 나누기
const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  /* height: 100px; */
  /* margin: 2px 0px; */
  /* padding: 10px 0px; */
  /* background-color: pink; */
  margin-bottom: 10px;
`;

const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  /* height: 220px; */
  /* margin: 2px 0px; */
  /* background-color: pink; */
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  /* height: 190px; */
  /* margin: 2px 0px; */
  padding: 10px 0px;
  border-top: 2px solid ${color.gray.default};
  border-bottom: 2px solid  ${color.gray.default};
  /* background-color: pink; */
`;

const FootBox = styled.div`
  display: flex;
  width: 300px;
  padding-top: 15px;
  /* height: 35px; */
  /* margin: 2px 0px; */
  /* background-color: pink; */
`;

// 내부 컨텐츠 시작
const LogoBox = styled.div`
	width: 300px;
	height: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
	/* background-color: blue; */
`;

const ModalTitle = styled.div`
  display: flex;
	width: 300px;
  /* height: 40px; */
  margin-top: 3px;
  /* margin-bottom: 7px; */
	/* background-color: yellow; */
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 20px;
  font-weight: 50px;
`;

const ModalText1 = styled.div`
  display: flex;
	width: 300px;
  /* height: 15px; */
  margin-bottom: 20px;
	/* background-color: skyblue; */
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: black;
`;

const ModalText2 = styled.div`
  display: flex;
	width: 300px;
	/* height: 50px; */
  /* background-color: skyblue; */
  margin-top: 4px;
  /* margin-bottom: 15px; */
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: black;
`;

const InputName = styled.input`
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
    /* padding-left: 10px; */
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

const SnsButton1 = styled.div`
  display: flex;
	width: 300px;
	/* height: 45px; */
	/* background-color: yellow; */
	margin-top: 15px;
  justify-content: center;
  align-items: center;
`;

const SnsButton2 = styled.div`
  display: flex;
	width: 300px;
	/* height: 45px; */
	/* background-color: green; */
	/* margin: 5px; */
  justify-content: center;
  align-items: center;
  margin: 7px 0px; 
`;

const SnsButton3 = styled.div`
  display: flex;
	width: 300px;
	/* height: 45px; */
  /* background-color: darkgray; */
	/* margin: 5px; */
  justify-content: center;
  align-items: center;
`;


const index = () => {
  return (
      <Modal>
        <TopBox>
          <LogoBox>
							<Image 
								src="/assets/logos/pinset_logo_black.png"
								layout="fill"
								objectFit="contain"	
							></Image>
          </LogoBox>
          <ModalTitle>PINSET에 오신 것을 환영합니다</ModalTitle>
          <ModalText1>당신의 공간을 공유하세요</ModalText1>
        </TopBox>
        <MiddleBox>
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
              btnHoverTextColor={color.white.default}
              >
            </Button>
          </SignupButton>
        </MiddleBox>
        <BottomBox>
          <ModalText2>다른 SNS 계정으로 가입하기</ModalText2>
          <SnsButton1>
            <Button
              btnBgColor={color.blue.default}
              btnWidth="300px"
              btnText="Facebook으로 가입하기"
              btnTextColor={color.white.default}
              btnHeight="35px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={color.blue.dark}
              btnHoverTextColor={color.white.default}
              >
            </Button>
          </SnsButton1>
          <SnsButton2>
          <Button
              btnBgColor={color.yellow.default}
              btnWidth="300px"
              btnText="kakao로 가입하기"
              btnTextColor={color.black.default}
              btnHeight="35px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={color.yellow.dark}
              btnHoverTextColor={color.black.default}
              >
            </Button>
          </SnsButton2>
          <SnsButton3>
            <Button
              btnBgColor={color.gray.default}
              btnWidth="300px"
              // btnMarginRight="40px"
              btnText="Google로 가입하기"
              btnTextColor={color.black.default}
              btnHeight="35px"
              btnFontWeight={700}
              btnBorderColor="transparent"
              btnHoverBorderColor="transparent"
              btnHoverBgColor={color.gray.semidark}
              btnHoverTextColor={color.black.default}
              >
            </Button>
          </SnsButton3>
        </BottomBox>
        <FootBox>
          <ModalText2>이미 회원이신가요? 로그인하기</ModalText2>
        </FootBox>
      </Modal>
  );
};

export default index;
