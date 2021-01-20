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

const NoticeIcon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  :hover {
    border-color: ${color.black.default};
  }
`;

const HeaderRight = () => {
  const [noticeImg, setNoticeImg] = useState<string>(
    "/assets/icons/bell_black_light.png"
  );

  const onMouseOver = (): void => {
    setNoticeImg("/assets/icons/bell_black.png");
  };
  const onMouseLeave = (): void => {
    setNoticeImg("/assets/icons/bell_black_light.png");
  };

  return (
    <Container>
      <Button
        btnText="사진 등록"
        btnWidth="80px"
        btnMarginLeft="20px"
        btnMarginRight="20px"
      ></Button>
      <NoticeIcon>
        <Image
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
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
