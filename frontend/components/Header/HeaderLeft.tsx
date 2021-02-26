import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import color from "../../styles/theme";
import { NextRouter } from "next/router";
import AutoSuggest from "../AutoSuggest";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LogoBox = styled.div`
  display: flex;
  cursor: pointer;
  margin-bottom: 2px;
`;

const LogoImage = styled.div`
  position: relative;
  margin-top: 2px;
  @media only screen and (min-width: 768px) {
    min-width: 28px;
    width: 28px;
    height: 28px;
  }
  @media only screen and (min-width: 1280px) {
    min-width: 32px;
    width: 32px;
    height: 32px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 70px;
  color: ${color.black.default};
  @media only screen and (min-width: 768px) {
    margin-left: 4px;
  }
  @media only screen and (min-width: 1280px) {
    margin-left: 12px;
  }
`;

const TitleText = styled.a`
  font-weight: 700;
  word-break: keep-all;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 20px;
  }
`;

const SloganText = styled.a`
  /* margin-top: -4px; */
  font-size: 12px;
`;

const SearchBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 38px;
  width: 100%;
  /* max-width: 700px; */
  transition: all 0.3s;
`;

const SearchInner = styled.div<HeaderProps>`
  display: flex;
  position: relative;
  align-items: center;
  border: 1px solid transparent;
  height: 100%;
  width: 100%;
  border-radius: 24px;
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
    border-bottom: ${(props) =>
      props.inputFocus
        ? "0px solid transparent"
        : `1px solid ${color.gray.default}`};
  }
  transition: all 0.3s;
`;

const SearchIcon = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  min-width: 15px;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    margin-left: 12px;
    margin-right: 6px;
  }
  @media only screen and (min-width: 1280px) {
    margin-left: 16px;
    margin-right: 10px;
  }
`;

const SearchInput = styled("input")<HeaderProps>`
  border: 0px;
  background-color: transparent;
  width: 100%;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${(props) =>
      (props.routerPath === "/" || props.routerPath === "/home") &&
      !props.inputFocus
        ? color.white.default
        : color.gray.dark};
  }
  @media only screen and (min-width: 768px) {
    margin-right: 10px;
  }
  @media only screen and (min-width: 1280px) {
    margin-right: 20px;
  }
`;

type HeaderProps = {
  routerPath?: String;
  router?: NextRouter;
  setInputFocus?: Dispatch<SetStateAction<boolean>>;
  inputFocus?: boolean;
  searchTerm?: string;
  setSearchTerm?: Dispatch<SetStateAction<String>>;
  windowWidth?: number;
};

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };

  return {
    loginState,
    toggle,
  };
};

const HeaderLeft = ({
  router,
  routerPath,
  setInputFocus,
  inputFocus,
  searchTerm,
  setSearchTerm,
  windowWidth,
}: HeaderProps) => {
  const props = { routerPath, inputFocus };

  const { loginState, toggle } = useStore();

  const titleBoxStyle = {
    color:
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? color.white.default
        : color.black.default,
  };

  const searchBoxStyle = {
    backgroundColor:
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? "transparent"
        : null,
    borderRadius: inputFocus ? "8px" : "24px",
    borderBottomLeftRadius: inputFocus ? "0px" : "24px",
    borderBottomRightRadius: inputFocus ? "0px" : "24px",
  };

  const searchInputStyle = {
    color:
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? color.white.default
        : null,
  };

  return (
    <Container>
      <Link href="/">
        <LogoBox
          onClick={() => {
            setInputFocus(false);
          }}
        >
          <LogoImage>
            <Image
              src={
                (routerPath === "/" || routerPath === "/home") && !inputFocus
                  ? "/assets/icons/eye_open_white.png"
                  : "/assets/icons/eye_open.png"
              }
              layout="fill"
              objectFit="contain"
            />
          </LogoImage>
          <TitleBox style={titleBoxStyle}>
            <TitleText>애프터눈</TitleText>
          </TitleBox>
        </LogoBox>
      </Link>
      <Button
        btnText="내 피드"
        btnWidth={windowWidth < 1280 ? "60px" : "80px"}
        btnMarginLeft={windowWidth < 1280 ? "8px" : "16px"}
        btnMarginRight={windowWidth < 1280 ? "10px" : "20px"}
        btnHoverBorderColor={
          (routerPath === "/" || routerPath === "/home") && !inputFocus
            ? "transparent"
            : null
        }
        btnBgColor={
          (routerPath === "/" || routerPath === "/home") && !inputFocus
            ? "transparent"
            : null
        }
        btnTextColor={
          (routerPath === "/" || routerPath === "/home") && !inputFocus
            ? "white"
            : color.black.default
        }
        btnBorderColor={
          (routerPath === "/" || routerPath === "/home") && !inputFocus
            ? "white"
            : color.black.default
        }
        btnUseOpacity={
          (routerPath === "/" || routerPath === "/home") && !inputFocus
            ? false
            : true
        }
        btnSetOpacity={"0.4"}
        btnOnClick={(): void => {
          if (loginState) {
            setInputFocus(false);
            router.push("/feed");
          } else {
            toggle();
          }
        }}
      />
      <SearchBox>
        {inputFocus && (
          <AutoSuggest
            setSearchTerm={setSearchTerm}
            setInputFocus={setInputFocus}
          ></AutoSuggest>
        )}
        <SearchInner
          style={searchBoxStyle}
          onFocus={() => {
            setInputFocus(true);
          }}
          inputFocus={inputFocus}
        >
          <SearchIcon
            onClick={() => {
              setInputFocus(false);
              router.push(`/search/${searchTerm}`);
            }}
          >
            <Image
              src={
                (routerPath === "/" || routerPath === "/home") && !inputFocus
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search/${searchTerm}`);
                setSearchTerm("");
                setInputFocus(false);
              }
              if (e.key === "Tab") {
                setInputFocus(false);
              }
              if (e.key === "Escape") {
                // setInputFocus(false);
                setSearchTerm("");
              }
            }}
          />
        </SearchInner>
      </SearchBox>
    </Container>
  );
};

export default HeaderLeft;
