import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import Image from "next/image";
import color from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (min-width: 768px) {
    padding-right: 10px;
    min-width: 90px;
  }
  @media only screen and (min-width: 1280px) {
    padding-right: 20px;
    min-width: 120px;
  }
`;

const NoticeIcon = styled.div<HeaderProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 50%;
  :hover {
    border-color: ${(props) =>
      (props.routerPath === "/" || props.routerPath === "/home") &&
      !props.inputFocus
        ? color.white.default
        : color.gray.darker};
  }
  transition: all 0.3s;
`;

const IconBox = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
`;

type HeaderProps = {
  routerPath?: String;
  inputFocus?: boolean;
  setInputFocus?: Dispatch<SetStateAction<boolean>>;
  windowWidth?: number;
};

const useStore = () => {
  const loginState = useSelector((state) => state.login.loginState);

  const dispatch = useDispatch();
  const toggleSubmit = async () => {
    await dispatch({ type: "TOGGLE_SUBMIT" });
  };
  const toggle = async () => {
    await dispatch({ type: "TOGGLE" });
  };

  return {
    toggleSubmit,
    loginState,
    toggle,
  };
};

const HeaderCenter = ({
  routerPath,
  inputFocus,
  setInputFocus,
  windowWidth,
}: HeaderProps) => {
  const { toggleSubmit, loginState, toggle } = useStore();

  const [noticeImg, setNoticeImg] = useState<string>(
    (routerPath === "/" || routerPath === "/home") && !inputFocus
      ? "/assets/icons/bell_white.png"
      : "/assets/icons/bell_black_light.png"
  );

  useEffect(() => {
    setNoticeImg(
      (routerPath === "/" || routerPath === "/home") && !inputFocus
        ? "/assets/icons/bell_white.png"
        : "/assets/icons/bell_black_light.png"
    );
  }, [routerPath, inputFocus]);

  const props = { routerPath, inputFocus };

  const noticeIconStyle = {
    borderRadius: "50%",
  };

  return (
    <Container>
      <Button
        btnText="사진 등록"
        btnWidth={windowWidth < 1280 ? "70px" : "80px"}
        btnMarginLeft={windowWidth < 1280 ? "10px" : "20px"}
        btnMarginRight="0px"
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
        btnOnClick={() => {
          if (loginState) {
            setInputFocus(false);
            toggleSubmit();
          } else {
            toggle();
          }
        }}
      />
      {/* <NoticeIcon {...props} style={noticeIconStyle}>
        <IconBox
          onClick={() => {
            Swal.fire({
              icon: "info",
              title: "알림 서비스 준비 중..",
              text: "슬프게도 여기에 시간을 투자할 수가 없어요..",
            });
            setInputFocus(false);
          }}
        >
          <Image
            src={noticeImg}
            layout="fill"
            quality="100"
            objectFit="contain"
          />
        </IconBox>
      </NoticeIcon> */}
    </Container>
  );
};

export default HeaderCenter;
