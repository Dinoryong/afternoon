import React, { useState } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 250px;
  border: 4px solid #aaaaaa;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 700;
  color: gray;
  cursor: pointer;
  opacity: 0.7;
  :hover {
    opacity: 1;
  }
  transition: all 0.4s;
`;

const index = ({
  btnBgColor = "white",
  btnTitle = "버튼버튼",
  btnHeight = "100px",
}) => {
  const [colorState, setColorState] = useState<string>("red");

  const onClickHandler = () => {
    setColorState(colorState == "red" ? "yellow" : "red");
  };

  return (
    <Container
      onClick={onClickHandler}
      style={{ backgroundColor: colorState, height: btnHeight }}
    >
      {btnTitle}
    </Container>
  );
};

export default index;
