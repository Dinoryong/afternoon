import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  width: 300px;
  padding-top: 15px;
`;

const ModalText = styled.div`
  display: flex;
  width: 300px;
  margin-top: 4px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  color: ${color.black.default};
  cursor: pointer;
`;

type footProps = {
  footText?: string;
  footOnClick?: Function;
};

const UserModalFoot = ({ footText, footOnClick }: footProps) => {
  return (
    <Container>
      <ModalText
        onClick={() => {
          footOnClick();
        }}
      >
        {footText}
      </ModalText>
    </Container>
  );
};

export default UserModalFoot;
