import React, { useState } from "react";
import styled from "@emotion/styled";
import PinTop from "./PinTop";
import PinBottom from "./PinBottom";

const Container = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  justify-content: center;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  margin: 12px 16px 8px 16px;
`;

const index = ({ pinData }) => {
  const [expand, setExpand] = useState(false);
  const {
    pinTitle,
    pinApi: { apiCategory, apiLink },
    pinLink,
    pinWriter,
    pinComments,
  } = pinData;
  return (
    <Container>
      <Wrapper>
        <PinTop pinTitle={pinTitle} apiCategory={apiCategory}></PinTop>
        <PinBottom
          pinLink={pinLink}
          pinWriter={pinWriter}
          apiLink={apiLink}
          pinComments={pinComments}
          expand={expand}
          setExpand={setExpand}
        ></PinBottom>
      </Wrapper>
    </Container>
  );
};

export default index;
