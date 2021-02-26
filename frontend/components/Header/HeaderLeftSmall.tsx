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
  min-width: 28px;
  width: 28px;
  height: 28px;
  margin-right: 4px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  color: ${color.black.default};
  margin-left: 4px;
  margin-right: 4px;
`;

const TitleText = styled.a`
  font-weight: 700;
  word-break: keep-all;
  font-size: 14px;
`;

const SloganText = styled.a`
  /* margin-top: -4px; */
  font-size: 12px;
`;

const SearchBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: 30px;
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
        ? "1px solid transparent"
        : `1px solid ${color.gray.default}`};
  }
  transition: all 0.3s;
`;

const SearchIcon = styled.div`
  position: relative;
  width: 12px;
  height: 12px;
  min-width: 12px;
  cursor: pointer;
  margin-left: 8px;
  margin-right: 4px;
`;

const SearchInput = styled("input")<HeaderProps>`
  border: 0px;
  background-color: transparent;
  width: 100%;
  font-size: 12px;
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
  margin-right: 8px;
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

const HeaderLeftSmall = ({
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
          {/* <TitleBox style={titleBoxStyle}>
            <TitleText>애프터눈</TitleText>
          </TitleBox> */}
        </LogoBox>
      </Link>
      <Button
        btnText="피드"
        btnWidth={"40px"}
        btnFontSize={"12px"}
        btnHeight={"28px"}
        btnMarginLeft={"4px"}
        btnMarginRight={"10px"}
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
            placeholder="태그/사용자 검색"
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

export default HeaderLeftSmall;
