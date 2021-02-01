import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HomeTagBox from "../../components/HomeTagBox";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Wrapper = styled.div<homBottomProps>`
  display: flex;
  width: 100%;
  min-height: 800px;
`;

const BigBox = styled.div`
  display: flex;
  height: 100%;
  width: 50%;
`;

const SmallGroup = styled(BigBox)`
  flex-direction: column;
`;

const SmallBox = styled.div`
  display: flex;
  height: 50%;
  width: 100%;
`;

type homBottomProps = {
  windowHeight?: number;
  windowWidth?: number;
};

const HomeBottom = () => {
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(function mount() {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", function () {
      setWindowHeight(window.innerHeight);
    });
  });

  return (
    <Container>
      <Wrapper style={{ height: windowHeight }}>
        <BigBox>
          <HomeTagBox
            boxFrameColor={color.homeTag.a}
            boxBgColor={color.homeTag.one}
            boxCountText={87}
            boxTitleText="개발자"
          />
        </BigBox>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.b}
              boxBgColor={color.homeTag.two}
              boxCountText={45}
              boxTitleText="와인룸"
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.c}
              boxBgColor={color.homeTag.zero}
              boxBgImage={"/assets/images/objects/squba.png"}
              boxImagePosition="right"
              boxCountText={78}
              boxTitleText="스킨스쿠버"
            />
          </SmallBox>
        </SmallGroup>
      </Wrapper>
      <Wrapper style={{ height: windowHeight }}>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.d}
              boxBgColor={color.homeTag.zero}
              boxCountText={74}
              boxTitleText="드레스룸"
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.e}
              boxBgColor={color.homeTag.zero}
              boxCountText={81}
              boxTitleText="고양이방"
            />
          </SmallBox>
        </SmallGroup>
        <BigBox>
          <HomeTagBox
            boxFrameColor={color.homeTag.f}
            boxBgColor={color.homeTag.one}
            boxCountText={32}
            boxTitleText="테니스"
          />
        </BigBox>
      </Wrapper>
      <Wrapper style={{ height: windowHeight }}>
        <BigBox>
          <HomeTagBox
            boxFrameColor={color.homeTag.g}
            boxBgColor={color.homeTag.one}
            boxCountText={94}
            boxTitleText="디자이너"
          />
        </BigBox>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.h}
              boxBgColor={color.homeTag.two}
              boxCountText={27}
              boxTitleText="서재"
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.i}
              boxBgColor={color.homeTag.zero}
              boxCountText={33}
              boxTitleText="피규어"
            />
          </SmallBox>
        </SmallGroup>
      </Wrapper>
      <Wrapper style={{ height: windowHeight }}>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.j}
              boxBgColor={color.homeTag.zero}
              boxCountText={64}
              boxTitleText="신발"
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.k}
              boxBgColor={color.homeTag.one}
              boxCountText={12}
              boxTitleText="캠핑"
            />
          </SmallBox>
        </SmallGroup>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.l}
              boxBgColor={color.homeTag.one}
              boxCountText={36}
              boxTitleText="필라테스"
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.m}
              boxBgColor={color.homeTag.zero}
              boxCountText={26}
              boxTitleText="요리사"
            />
          </SmallBox>
        </SmallGroup>
      </Wrapper>
    </Container>
  );
};

export default HomeBottom;
