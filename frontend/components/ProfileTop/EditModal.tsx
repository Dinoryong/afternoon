import React from 'react'
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  background-color: rgba(0,0,0);
`; 

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const EditModal = () => {
  return (
    <Container>
      <Wrapper>
        이거시 에딧뜨 모달 모달
      </Wrapper>
    </Container>
  )
}

export default EditModal
