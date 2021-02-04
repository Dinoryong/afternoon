import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TagBox from "../../components/TagBox";

const Container = styled.div`
  position: relative;
  height: 100%;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(function mount() {
    setWindowHeight(window.innerHeight);
    window.addEventListener("resize", function () {
      setWindowHeight(window.innerHeight);
    });
  });

  return (
    <Container style={{ height: windowHeight }}>
      <TagBox tagId={1}></TagBox>
      <TagBox tagId={2}></TagBox>
      <TagBox tagId={3}></TagBox>
      <TagBox tagId={4}></TagBox>
      <TagBox tagId={5}></TagBox>
      <TagBox tagId={6}></TagBox>
      <TagBox tagId={7}></TagBox>
      <TagBox tagId={8}></TagBox>
      <TagBox tagId={9}></TagBox>
      <TagBox tagId={10}></TagBox>
      <TagBox tagId={11}></TagBox>
      <TagBox tagId={12}></TagBox>
      <TagBox tagId={13}></TagBox>
      <TagBox tagId={14}></TagBox>
      <TagBox tagId={15}></TagBox>
      <TagBox tagId={16}></TagBox>
      <TagBox tagId={17}></TagBox>
      <TagBox tagId={18}></TagBox>
      <TagBox tagId={19}></TagBox>
      <TagBox tagId={20}></TagBox>
      <TagBox tagId={21}></TagBox>
      <TagBox tagId={22}></TagBox>
      <TagBox tagId={23}></TagBox>
    </Container>
  );
};

export default index;
