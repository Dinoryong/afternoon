import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";
import TopLeft from "../../components/ProfileTop/TopLeft"
import TopRight from "../../components/ProfileTop/TopRight"
import MenuBar from "../../components/ProfileTop/MenuBar"

const Container = styled.div`
  display: flex;
  width: 1280px;
  height: 430px;
  margin-top: 152px;
  margin-bottom: 10px;
`;

const Container2 = styled.div`
	display: flex;
	width: 96%;
	height: 72px;
	border-bottom: solid ${color.gray.default} 2px; 
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-items: flex-end;
  width: 230px;
  height: 430px;
  margin-left: auto;
  margin-right: 10px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 700px;
  height: 350px;
  margin-right: auto;
  margin-left: 10px;
`;

const index = () => {
  return (
    <>
      <Container>
        <Wrapper1>
          <TopLeft></TopLeft>
        </Wrapper1>
        <Wrapper2>
          <TopRight></TopRight>
        </Wrapper2>
      </Container>
      <Container2>
        <MenuBar></MenuBar>
      </Container2>
    </>
  );
};

export default index;
