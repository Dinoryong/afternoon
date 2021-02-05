import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import Image from "next/image";
import color from "../../styles/theme";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  min-width: 180px;
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
      props.routerPath === "/" ? color.white.default : color.gray.darker};
  }
  transition: all 0.2s;
`;

type HeaderProps = {
  routerPath?: String;
};

const useCounter = () => {
  const dispatch = useDispatch();
  const toggleSubmit = async () => {
    await dispatch({ type: "TOGGLE_SUBMIT" });
  };

  return {
    toggleSubmit,
  };
};

const HeaderRight = ({ routerPath }: HeaderProps) => {
  const { toggleSubmit } = useCounter();

  const [noticeImg, setNoticeImg] = useState<string>(
    routerPath === "/"
      ? "/assets/icons/bell_white.png"
      : "/assets/icons/bell_black_light.png"
  );

  useEffect(() => {
    setNoticeImg(
      routerPath === "/"
        ? "/assets/icons/bell_white.png"
        : "/assets/icons/bell_black_light.png"
    );
  }, [routerPath]);

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
        btnTextColor={routerPath === "/" ? "white" : color.black.default}
        btnBorderColor={routerPath === "/" ? "white" : color.black.default}
        btnUseOpacity={routerPath === "/" ? false : true}
        btnSetOpacity={"0.4"}
        btnOnClick={toggleSubmit}
      />
      <NoticeIcon {...props} style={noticeIconStyle}>
        <Image
          src={noticeImg}
          width="22"
          height="22"
          quality="100"
          objectFit="contain"
        />
      </NoticeIcon>
    </Container>
  );
};

export default HeaderRight;
