import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import Image from "next/image";
import color from "../../styles/theme";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  min-width: 170px;
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
      props.routerPath === "/" ? color.white.default : "transparent"};
    /* background-color: ${(props) =>
      props.routerPath === "/" ? color.gray.light : "transparent"}; */
  }
`;

type HeaderProps = {
  routerPath?: String;
};

const HeaderRight = ({ routerPath }: HeaderProps) => {
  const [noticeImg, setNoticeImg] = useState<string>(
    routerPath === "/"
      ? "/assets/icons/bell_white.png"
      : "/assets/icons/bell_black_light.png"
  );

  const onMouseOver = (): void => {
    setNoticeImg(
      routerPath === "/"
        ? "/assets/icons/bell_white.png"
        : "/assets/icons/bell_black.png"
    );
  };
  const onMouseLeave = (): void => {
    setNoticeImg(
      routerPath === "/"
        ? "/assets/icons/bell_white.png"
        : "/assets/icons/bell_black_light.png"
    );
  };

  const props = { routerPath };

  const noticeIconStyle = {
    borderRadius: "50%",
  };

  return (
    <Container>
      <Button
        btnText="사진 등록"
        btnWidth="80px"
        btnMarginLeft="20px"
        btnMarginRight="20px"
        btnHoverBorderColor={routerPath === "/" ? "transparent" : null}
        btnBgColor={routerPath === "/" ? "transparent" : null}
        btnTextColor={routerPath === "/" ? "white" : null}
        btnBorderColor={routerPath === "/" ? "white" : null}
      ></Button>
      <NoticeIcon
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        {...props}
        style={noticeIconStyle}
      >
        <Image
          src={noticeImg}
          width="20"
          height="20"
          quality="100"
          objectFit="contain"
        />
      </NoticeIcon>
    </Container>
  );
};

export default HeaderRight;
