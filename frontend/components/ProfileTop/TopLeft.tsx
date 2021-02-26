import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  margin-right: 20px;
  @media only screen and (max-width: 768px) {
    width: 170px;
    max-width: 90%;
  }
  @media only screen and (min-width: 768px) {
    margin-left: auto;
    justify-items: flex-end;
    width: 170px;
    min-width: 170px;
  }
  @media only screen and (min-width: 1280px) {
    margin-left: auto;
    justify-items: flex-end;
    width: 230px;
    min-width: 230px;
  }
`;

const ImgBox = styled.div`
  display: flex;
  position: absolute;
  width: 180px;
  height: 180px;
  margin-top: 17px;
  @media only screen and (max-width: 768px) {
    margin-top: 10px;
    width: 70px;
    height: 70px;
  }
`;

const TopLeft = ({ accountPhoto = "/assets/icons/eye_open.png" }) => {
  if (accountPhoto === "") accountPhoto = "/assets/icons/eye_open.png";
  return (
    <Container>
      <ImgBox>
        <Image
          className="next_border_image circle"
          src={accountPhoto}
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
    </Container>
  );
};

export default TopLeft;
