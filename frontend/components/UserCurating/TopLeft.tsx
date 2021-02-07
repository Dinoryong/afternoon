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
  margin-left: auto;
  margin-right: 20px;
`;

const ImgBox = styled.div`
  display: flex;
  position: absolute;
  width: 180px;
  height: 180px;
  margin-top: 17px;
`;

const TopLeft = ({ userImg }) => {
  return (
    <Container>
      <ImgBox>
        <Image
          className="next_border_image circle"
          src={userImg}
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
    </Container>
  );
};

export default TopLeft;
