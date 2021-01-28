import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${color.gray.default};
  background-color: ${color.white.default};
  cursor: pointer;
`;

const AddIconBox = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

const AddTextBox = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 500;
  color: ${color.gray.default};
`;

const InputFileHide = styled.input`
  display: none;
`;

const UploadButtonBox = ({ setImageAsFile }) => {
  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileChange = (e) => {
    let image = e.target.files[0];

    setImageAsFile({
      image: image,
      url: "",
      progress: 0,
    });
  };

  return (
    <Container onClick={onButtonClick}>
      <AddIconBox>
        <Image
          src="/assets/icons/plus_blue.png"
          layout="fill"
          objectFit="contain"
          quality={100}
        />
      </AddIconBox>
      <AddTextBox>사진을 추가해주세요</AddTextBox>
      <InputFileHide
        type="file"
        id="file"
        ref={inputFile}
        onChange={(e) => handleFileChange(e)}
      />
    </Container>
  );
};

export default UploadButtonBox;
