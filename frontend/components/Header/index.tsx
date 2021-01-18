import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
`;

const Wrapper1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;

const Wrapper2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const index = () => {
  return <Container></Container>;
};

export default index;
