import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 62px;
  width: 100%;
  height: 1000px;
`;

const index = () => {
  return <Container>검색 페이지 입니다.</Container>;
};

export default index;
