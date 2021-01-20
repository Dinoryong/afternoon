import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  height: 1100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const index = () => {
  return <Container>홈 화면 입니다.</Container>;
};

export default index;
