import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignupModal from "../../components/SignupModal";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;

const TextBox1 = styled.div`
  display: flex;
  text-align: left;
  font-weight: bold;
  @media only screen and (min-width: 768px) {
    font-size: 32px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 48px;
  }
`;

const TextBox2 = styled.div`
  display: flex;
  text-align: left;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
    margin-top: 20px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 24px;
    margin-top: 40px;
  }
`;

const TextBox3 = styled.div`
  display: flex;
  text-align: left;
  @media only screen and (min-width: 768px) {
    font-size: 12px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 15px;
  }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: white;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 36px;
  }
`;

const LogoBox = styled.div`
  position: relative;
  display: flex;
  min-width: 32px;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
  @media only screen and (min-width: 1280px) {
    width: 48px;
    height: 48px;
  }
`;

const InnerBox1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: space-between;
  margin-left: 50px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const MiniBox1 = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
`;

const TitleText = styled.div`
  margin-bottom: 4px;
  margin-left: 8px;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 28px;
  }
`;

const MiniBox2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 150px;
  justify-content: space-between;
`;

const MiniBox3 = styled.div`
  display: flex;
  width: 100%;
`;

const InnerBox2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  min-width: 440px;
  height: 100%;
`;

const index = () => {
  const [windowHeight, setWindowHeight] = useState<number>();
  const [windowWidth, setWindowWidth] = useState<number>();

  useEffect(() => {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  return (
    <Container style={{ height: windowHeight }}>
      <Image
        src="/assets/images/signup_bg.jpg"
        layout="fill"
        objectFit="cover"
      ></Image>
      <BgOpacityFrame />
      {windowWidth > 768 && (
        <Content>
          <InnerBox1 style={{ height: `${windowHeight - 80}px` }}>
            <Link href="/">
              <MiniBox1>
                <LogoBox>
                  <Image
                    src="/assets/icons/eye_open_white.png"
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </LogoBox>
                <TitleText>애프터눈</TitleText>
              </MiniBox1>
            </Link>
            <MiniBox2>
              {windowWidth > 1280 && (
                <TextBox1>더 나은 당신을 위해, 애프터눈</TextBox1>
              )}
              {windowWidth <= 1280 && (
                <>
                  <TextBox1>더 나은 당신을 위해,</TextBox1>
                  <TextBox1>애프터눈</TextBox1>
                </>
              )}
              <TextBox2>
                실사용자가 추천하는 2,490,795 개의 아이템을 어디에서든 바로
                구매할 수 있습니다.
              </TextBox2>
            </MiniBox2>
            <MiniBox3>
              <TextBox3>프라푸룡 님이 1년 전에 업로드한 사진입니다</TextBox3>
            </MiniBox3>
          </InnerBox1>
          <InnerBox2>
            <SignupModal />
          </InnerBox2>
        </Content>
      )}
      {windowWidth <= 768 && (
        <Content>
          <SignupModal />
        </Content>
      )}
    </Container>
  );
};

export default index;
