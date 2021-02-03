import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import color from "../../styles/theme";
import { NextRouter } from "next/router";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LogoBox = styled.div`
  display: flex;
  cursor: pointer;
`;

const LogoImage = styled.div`
  position: relative;
  min-width: 32px;
  width: 32px;
  height: 32px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  min-width: 134px;
  color: ${color.black.default};
`;

const TitleText = styled.a`
  font-size: 15px;
  font-weight: 700;
`;

const SloganText = styled.a`
  margin-top: -4px;
  font-size: 12px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 24px;
  border: 1px solid transparent;
  height: 38px;
  width: 100%;
  /* max-width: 700px; */
  background-color: ${color.gray.light};
  :not(:focus-within) {
    :hover {
      border-color: ${color.gray.default};
    }
  }
  :focus-within {
    background-color: white;
    border-color: ${color.gray.default};
  }
  transition: all 0.3s;
`;

const SearchIcon = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  min-width: 15px;
  margin-left: 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const SearchInput = styled("input")<HeaderProps>`
  border: 0px;
  background-color: transparent;
  width: 100%;
  margin-right: 20px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) =>
      props.routerPath === "/" ? color.white.default : color.gray.dark};
  }
`;

type HeaderProps = {
  routerPath?: String;
  router?: NextRouter;
};

const HeaderLeft = ({ router, routerPath }: HeaderProps) => {
  const props = { routerPath };

  const titleBoxStyle = {
    color: routerPath === "/" ? color.white.default : color.black.default,
  };

  const searchBoxStyle = {
    backgroundColor: routerPath === "/" ? "transparent" : color.gray.light,
  };

  const searchInputStyle = {
    color: routerPath === "/" ? color.white.default : null,
  };

  return (
    <Container>
      <Link href="/">
        <LogoBox>
          <LogoImage>
            <Image
              src={
                routerPath === "/"
                  ? "/assets/logos/pinset_logo_white.png"
                  : "/assets/logos/pinset_logo_black.png"
              }
              layout="fill"
              objectFit="contain"
            />
          </LogoImage>
          <TitleBox style={titleBoxStyle}>
            <TitleText>PINSET</TitleText>
            <SloganText>Share Pins from Photos</SloganText>
          </TitleBox>
        </LogoBox>
      </Link>
      <Button
        btnText="내 피드"
        btnWidth="80px"
        btnMarginLeft="16px"
        btnMarginRight="20px"
        btnHoverBorderColor={routerPath === "/" ? "transparent" : null}
        btnBgColor={routerPath === "/" ? "transparent" : null}
        btnTextColor={routerPath === "/" ? "white" : color.black.default}
        btnBorderColor={routerPath === "/" ? "white" : color.black.default}
        btnUseOpacity={routerPath === "/" ? false : true}
        btnSetOpacity={"0.4"}
        btnOnClick={(): void => {
          router.push("/feed");
        }}
      />
      <SearchBox style={searchBoxStyle}>
        <SearchIcon>
          <Image
            src={
              routerPath === "/"
                ? "/assets/icons/search_white.png"
                : "/assets/icons/search_black_light.png"
            }
            layout="fill"
            objectFit="contain"
            quality="100"
          />
        </SearchIcon>
        <SearchInput
          {...props}
          style={searchInputStyle}
          placeholder="태그 또는 사용자를 검색해보세요!"
        />
      </SearchBox>
    </Container>
  );
};

export default HeaderLeft;
