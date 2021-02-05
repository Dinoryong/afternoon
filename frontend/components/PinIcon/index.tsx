import styled from "@emotion/styled";
import React from "react";
import color from "../../styles/theme";

const PinIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${color.black.default};
`;

const PinMini = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${color.black.default};
`;

const index = () => {
  return (
    <PinIcon>
      <PinMini />
    </PinIcon>
  );
};

export default index;
