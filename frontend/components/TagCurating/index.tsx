import React, { useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import TagLeft from "./TagLeft";
import TagRight from "./TagRight";

const Container = styled.div`
  /* width: 1280px; */
  width: 1000px;
  height: 300px;
  display: flex;
  justify-content: center;
  /* background-color: gray; */
`;

const Wrapper = styled.div`
  display: flex;
  margin: 10px 0px;
  /* justify-content: space-between; */
  /* align-content: space-between; */
  /* background-color: skyblue; */
`;

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
      <Wrapper>
        <TagLeft tagTitle={tagTitle} tagText={tagText}></TagLeft>
        <TagRight
          tagContributions={tagContributions}
          tagUsers={tagUsers}
          tagTopUser={tagTopUser}
          tagTopPost={tagTopPost}
          tagTopContributer={tagTopContributer}
        ></TagRight>
      </Wrapper>
    </Container>
  );
};

export default index;
