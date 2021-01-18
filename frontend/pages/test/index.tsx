import React from "react";
import Button from "../../components/ExampleButton";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-top: 80px;
  height: 500px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  return (
    <Container>
      <Button btnBgColor="black" btnTitle="로그인"></Button>
      <Button btnBgColor="blue" btnTitle="로그아웃" btnHeight="200px"></Button>
      <Button btnHeight="300px"></Button>
    </Container>
  );
};

export default index;
