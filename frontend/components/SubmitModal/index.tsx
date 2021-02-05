import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ConfirmUpload from "./ConfirmUpload";
import PhotoUpload from "./PhotoUpload";

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px 20px;
`;

const index = ({ windowWidth, windowHeight }) => {
  const [imageAsFile1, setImageAsFile1] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile2, setImageAsFile2] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile3, setImageAsFile3] = useState({
    image: null,
    url: "",
    progress: 0,
  });
  const [imageAsFile4, setImageAsFile4] = useState({
    image: null,
    url: "",
    progress: 0,
  });

  const [uploadState, setUploadState] = useState(0);

  return (
    <Container
      style={{
        width: `${windowWidth - 240}px`,
        height: `${windowHeight - 80}px`,
      }}
    >
      <Wrapper>
        <PhotoUpload
          {...{
            imageAsFile1,
            setImageAsFile1,
            imageAsFile2,
            setImageAsFile2,
            imageAsFile3,
            setImageAsFile3,
            imageAsFile4,
            setImageAsFile4,
            setUploadState,
            uploadState,
          }}
        ></PhotoUpload>
        <ConfirmUpload
          {...{
            imageAsFile1,
            imageAsFile2,
            imageAsFile3,
            imageAsFile4,
            setUploadState,
            uploadState,
          }}
        ></ConfirmUpload>
      </Wrapper>
    </Container>
  );
};

export default index;
