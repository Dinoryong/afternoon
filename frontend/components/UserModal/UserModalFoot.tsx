import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";

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
`;

type footProps = { 
  footText?: string
}

const UserModalFoot = ({ footText }:footProps) => {
  return (
        <Container>
          <ModalText>{footText}</ModalText>
        </Container>
  );
};

export default UserModalFoot;
