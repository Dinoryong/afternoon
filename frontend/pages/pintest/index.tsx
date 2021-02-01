import React from "react";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import color from "../../styles/theme";
import Image from "next/image";
import PinModal from "../../components/PinModal"

const Temporary = styled.div`
  width: 1280px;
  height: 810px;
  padding: 100px;
  background-color: lightgray;
`;

const index = () => {
  return (
    <Temporary>
      <PinModal></PinModal>
    </Temporary>
  )
}

export default index
