import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #d1d1d1;
  margin-right: 18px;
  height: 32px;
  min-width: 65px;
  padding: 0px 10px;
  cursor: pointer;
  :hover {
    border-color: #111111;
    color: #111111;
  }
  transition: all 0.2s;
`;

type ButtonProps = {
  btnText?: string;
  btnBgColor?: string;
};

const index = ({ btnText, btnBgColor }: ButtonProps) => {
  return (
    <Container style={{ backgroundColor: btnBgColor }}>{btnText}</Container>
  );
};

export default index;
