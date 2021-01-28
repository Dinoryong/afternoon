import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UploadPreviewBox = ({ imageAsFile }) => {
  return (
    <Container>
      <Image src={imageAsFile.url} layout="fill" objectFit="cover" />
    </Container>
  );
};

export default UploadPreviewBox;
