import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const ImgBox = styled.div`
  display: flex;
  position: absolute;
  width: 200px;
  height: 200px;
`;

const TopLeft = () => {
  return (
    <>
      <ImgBox>
        <Image
          className="next_border_image circle"
          src="/assets/images/sample_profile.png"
          layout="fill"
          objectFit="cover"
        ></Image>
      </ImgBox>
    </>
  );
};

export default TopLeft;
