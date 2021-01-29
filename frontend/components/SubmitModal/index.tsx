import styled from "@emotion/styled";
import React from "react";
import PhotoUpload from "./PhotoUpload";

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 15px 20px 10px 20px;
  width: 100%;
  height: 100%;
`;

const index = ({ windowWidth, windowHeight }) => {
  return (
    <Container
      style={{
        width: `${windowWidth - 240}px`,
        height: `${windowHeight - 80}px`,
      }}
    >
      <Wrapper>
        <PhotoUpload></PhotoUpload>
      </Wrapper>
    </Container>
  );
};

export default index;
