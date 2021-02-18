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
  const [scrollTop, setScrollTop] = useState(0);

  console.log(scrollTop);

  useEffect(function mount() {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
    };
    const scrollHandler = () => {
      setScrollTop(window.scrollY);
    };

    setScrollTop(window.scrollY);
    setWindowHeight(window.innerHeight);

    window.addEventListener("resize", resizeHandler);

    window.addEventListener("scroll", scrollHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", scrollHandler);
    };

    return cleanup;
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
            boxBgImage={"/assets/images/objects/developer.png"}
            boxImagePosition="center"
            boxScrollObs={(windowHeight * 8) / 16}
            scrollTop={scrollTop}
          />
        </BigBox>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.b}
              boxBgColor={color.homeTag.two}
              boxCountText={45}
              boxTitleText="스키"
              boxScrollObs={(windowHeight * 6) / 16}
              scrollTop={scrollTop}
              boxBgImage={"/assets/images/objects/ski.png"}
              boxImagePosition="center"
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
              boxScrollObs={(windowHeight * 13) / 16}
              scrollTop={scrollTop}
              boxImageSize={"small"}
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
              boxBgImage={"/assets/images/objects/cooking.png"}
              boxTitleText="요리"
              boxScrollObs={(windowHeight * 22) / 16}
              scrollTop={scrollTop}
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.e}
              boxBgColor={color.homeTag.zero}
              boxCountText={81}
              boxTitleText="고양이방"
              boxBgImage={"/assets/images/objects/catroom.png"}
              boxImagePosition="80%"
              boxScrollObs={(windowHeight * 30) / 16}
              scrollTop={scrollTop}
            />
          </SmallBox>
        </SmallGroup>
        <BigBox>
          <HomeTagBox
            boxFrameColor={color.homeTag.f}
            boxBgColor={color.homeTag.one}
            boxCountText={32}
            boxTitleText="패션"
            boxBgImage={"/assets/images/objects/fashion.png"}
            boxImagePosition="20%"
            boxScrollObs={(windowHeight * 24) / 16}
            boxImageSize={"small"}
            scrollTop={scrollTop}
          />
        </BigBox>
      </Wrapper>
      <Wrapper style={{ height: windowHeight }}>
        <BigBox>
          <HomeTagBox
            boxFrameColor={color.homeTag.g}
            boxBgColor={color.homeTag.one}
            boxCountText={94}
            boxTitleText="카페"
            boxBgImage={"/assets/images/objects/cafe.png"}
            boxScrollObs={(windowHeight * 40) / 16}
            boxImageSize="small"
            boxImagePosition="0%"
            scrollTop={scrollTop}
          />
        </BigBox>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.h}
              boxBgColor={color.homeTag.two}
              boxCountText={27}
              boxTitleText="서재"
              boxBgImage={"/assets/images/objects/library.png"}
              boxScrollObs={(windowHeight * 38) / 16}
              boxImagePosition="20%"
              scrollTop={scrollTop}
              boxImageSize={"small"}
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.i}
              boxBgColor={color.homeTag.zero}
              boxCountText={33}
              boxTitleText="게임"
              boxBgImage={"/assets/images/objects/game.png"}
              boxScrollObs={(windowHeight * 45) / 16}
              boxImagePosition={"70%"}
              scrollTop={scrollTop}
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
              boxTitleText="테니스"
              boxBgImage={"/assets/images/objects/tennis.png"}
              boxScrollObs={(windowHeight * 53) / 16}
              scrollTop={scrollTop}
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.k}
              boxBgColor={color.homeTag.one}
              boxCountText={12}
              boxTitleText="메이크업"
              boxBgImage={"/assets/images/objects/makeup.png"}
              boxScrollObs={(windowHeight * 61) / 16}
              boxImagePosition={"70%"}
              scrollTop={scrollTop}
            />
          </SmallBox>
        </SmallGroup>
        <SmallGroup>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.l}
              boxBgColor={color.homeTag.one}
              boxCountText={36}
              boxTitleText="악기"
              boxBgImage={"/assets/images/objects/piano.png"}
              boxImagePosition={"60%"}
              boxScrollObs={(windowHeight * 53) / 16}
              scrollTop={scrollTop}
            />
          </SmallBox>
          <SmallBox>
            <HomeTagBox
              boxFrameColor={color.homeTag.m}
              boxBgColor={color.homeTag.zero}
              boxCountText={26}
              boxTitleText="카메라"
              boxScrollObs={(windowHeight * 61) / 16}
              boxImagePosition={"80%"}
              boxBgImage={"/assets/images/objects/camera.png"}
              scrollTop={scrollTop}
            />
          </SmallBox>
        </SmallGroup>
      </Wrapper>
    </Container>
  );
};

export default HomeBottom;
