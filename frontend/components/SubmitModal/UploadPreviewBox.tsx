import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${color.gray.default};
  cursor: pointer;
`;

const AddIconBox = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const AddTextBox = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: 500;
  color: ${color.gray.default};
`;

const UploadPreviewBox = ({ imageAsFile, setImageAsFile }) => {
  return (
    <Container>
      <Image
        src={imageAsFile}
        layout="fill"
        objectFit="contain"
        quality={100}
      />
    </Container>
  );
};

export default UploadPreviewBox;
