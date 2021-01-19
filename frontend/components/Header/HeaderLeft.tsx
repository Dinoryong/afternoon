import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import color from "../../styles/theme";

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
  max-width: 800px;
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
  transition: all 0.2s;
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

const SearchInput = styled("input")`
  border: 0px;
  background-color: transparent;
  width: 100%;
  margin-right: 20px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.dark};
  }
`;

const HeaderLeft = () => {
  return (
    <Container>
      <Link href="/">
        <LogoBox>
          <LogoImage>
            <Image
              src="/assets/logos/pinset_logo_black.png"
              layout="fill"
              objectFit="contain"
            />
          </LogoImage>
          <TitleBox>
            <TitleText>PINSET</TitleText>
            <SloganText>Share Pins from Photos</SloganText>
          </TitleBox>
        </LogoBox>
      </Link>
      <Button btnText="내 피드" />
      <SearchBox>
        <SearchIcon>
          <Image
            src="/assets/icons/search_black_light.png"
            layout="fill"
            objectFit="contain"
          />
        </SearchIcon>
        <SearchInput placeholder="태그 또는 사용자를 검색해보세요!" />
      </SearchBox>
    </Container>
  );
};

export default HeaderLeft;
