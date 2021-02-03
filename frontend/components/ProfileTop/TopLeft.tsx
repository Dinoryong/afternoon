import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  justify-items: flex-end;
  width: 230px;
  min-width: 230px;
  /* height: 430px; */
  margin-left: auto;
  margin-right: 10px;
`;

const ImgBox = styled.div`
  display: flex;
  position: absolute;
  width: 200px;
  height: 200px;
`;

const TopLeft = ({ profileImg }) => {
  return (
    <Container>
      <ImgBox>
        <Image
          className="next_border_image circle"
          src={profileImg}
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
    </Container>
  );
};

export default TopLeft;
