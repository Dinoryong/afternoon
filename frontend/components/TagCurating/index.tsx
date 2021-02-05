import React, { useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import TagLeft from "./TagLeft";
import TagRight from "./TagRight";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 280px;
  display: flex;
  justify-content: center;
`;

// const Wrapper = styled.div`
//   display: flex;
//   margin: 10px 0px;
// `;

const index = ({ tagData }) => {
  // const [expand, setExpand] = useState(false);
  const {
    tagTitle,
    tagText,
    tagContributions,
    tagUsers,
    tagTopUser,
    tagTopPost,
    tagTopContributer,
  } = tagData;
  return (
    <Container>
      {/* <Wrapper> */}
      <TagLeft tagTitle={tagTitle} tagText={tagText}></TagLeft>
      <TagRight
        tagContributions={tagContributions}
        tagUsers={tagUsers}
        tagTopUser={tagTopUser}
        tagTopPost={tagTopPost}
        tagTopContributer={tagTopContributer}
      ></TagRight>
      {/* </Wrapper> */}
    </Container>
  );
};

export default index;
