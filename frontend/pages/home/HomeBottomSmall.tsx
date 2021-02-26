import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import HomeTagBoxSmall from "../../components/HomeTagBoxSmall";
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
  height: 200px;
  width: 100%;
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

const HomeBottomSmall = () => {
  const [windowHeight, setWindowHeight] = useState<number>();
  const [scrollTop, setScrollTop] = useState(0);

  //replace_console_log(scrollTop);

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
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.a}
          boxBgColor={color.homeTag.one}
          boxCountText={87}
          boxTitleText="개발자"
          boxBgImage={"/assets/images/objects/developer.png"}
          boxImagePosition="center"
          boxScrollObs={0}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.b}
          boxBgColor={color.homeTag.two}
          boxCountText={45}
          boxTitleText="스키"
          boxScrollObs={windowHeight > 700 ? 0 : 100}
          scrollTop={scrollTop}
          boxBgImage={"/assets/images/objects/ski.png"}
          boxImagePosition="center"
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.c}
          boxBgColor={color.homeTag.zero}
          boxBgImage={"/assets/images/objects/squba.png"}
          boxImagePosition="right"
          boxCountText={78}
          boxTitleText="스킨스쿠버"
          boxScrollObs={200 * 1}
          scrollTop={scrollTop}
          // boxImageSize={"small"}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.d}
          boxBgColor={color.homeTag.one}
          boxCountText={74}
          boxBgImage={"/assets/images/objects/cooking.png"}
          boxTitleText="요리"
          boxScrollObs={200 * 2}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.e}
          boxBgColor={color.homeTag.zero}
          boxCountText={81}
          boxTitleText="고양이방"
          boxBgImage={"/assets/images/objects/catroom.png"}
          boxImagePosition="80%"
          boxScrollObs={200 * 3}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.f}
          boxBgColor={color.homeTag.one}
          boxCountText={32}
          boxTitleText="패션"
          boxBgImage={"/assets/images/objects/fashion.png"}
          boxImagePosition="20%"
          boxScrollObs={200 * 4}
          // boxImageSize={"small"}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.g}
          boxBgColor={color.homeTag.zero}
          boxCountText={94}
          boxTitleText="카페"
          boxBgImage={"/assets/images/objects/cafe.png"}
          boxScrollObs={200 * 5}
          boxImageSize="small"
          boxImagePosition="0%"
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.h}
          boxBgColor={color.homeTag.two}
          boxCountText={27}
          boxTitleText="서재"
          boxBgImage={"/assets/images/objects/library.png"}
          boxScrollObs={200 * 6}
          boxImagePosition="20%"
          scrollTop={scrollTop}
          // boxImageSize={"small"}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.i}
          boxBgColor={color.homeTag.zero}
          boxCountText={33}
          boxTitleText="게임"
          boxBgImage={"/assets/images/objects/game.png"}
          boxScrollObs={200 * 7}
          boxImagePosition={"70%"}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.j}
          boxBgColor={color.homeTag.two}
          boxCountText={64}
          boxTitleText="테니스"
          boxBgImage={"/assets/images/objects/tennis.png"}
          boxScrollObs={200 * 8}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.k}
          boxBgColor={color.homeTag.one}
          boxCountText={12}
          boxTitleText="메이크업"
          boxBgImage={"/assets/images/objects/makeup.png"}
          boxScrollObs={200 * 9}
          boxImagePosition={"70%"}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.l}
          boxBgColor={color.homeTag.two}
          boxCountText={36}
          boxTitleText="악기"
          boxBgImage={"/assets/images/objects/piano.png"}
          boxImagePosition={"60%"}
          boxScrollObs={200 * 10}
          scrollTop={scrollTop}
        />
      </BigBox>
      <BigBox>
        <HomeTagBoxSmall
          boxFrameColor={color.homeTag.m}
          boxBgColor={color.homeTag.zero}
          boxCountText={26}
          boxTitleText="카메라"
          boxScrollObs={200 * 10}
          boxImagePosition={"80%"}
          boxBgImage={"/assets/images/objects/camera.png"}
          scrollTop={scrollTop}
        />
      </BigBox>
    </Container>
  );
};

export default HomeBottomSmall;
