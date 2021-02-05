import styled from "@emotion/styled";
import React, { useState } from "react";
import TagList from "../../data/TagList";
import color from "../../styles/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  min-width: 80px;
  padding: 4px 0px;
  font-size: 14px;
  color: ${color.white.default};
  border: 1px solid ${color.white.default};
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
`;

const TextBox = styled.div`
  transition: all 0.3s;
`;

const DeleteBox = styled.div`
  position: absolute;
  transition: all 0.3s;
  color: ${color.black.default};
`;

const index = ({
  tagId = 1,
  tagMargin = "0px",
  tagOnClick = () => {
    console.log(tagId);
  },
  tagUseDelete = true,
}) => {
  const [mouseOver, setMouseOver] = useState(false);

  const tagInfo = TagList[tagId - 1];

  return (
    <Container
      onClick={tagOnClick}
      onMouseOver={() => {
        if (tagUseDelete) setMouseOver(true);
      }}
      onMouseLeave={() => {
        if (tagUseDelete) setMouseOver(false);
      }}
      style={{
        backgroundColor: mouseOver ? "white" : tagInfo.tagColor,
        margin: tagMargin,
        borderColor: mouseOver ? color.black.default : tagInfo.tagColor,
      }}
    >
      <TextBox style={mouseOver ? { opacity: 0 } : { opacity: 1 }}>
        {tagInfo.tagTitle}
      </TextBox>
      <DeleteBox style={{ opacity: mouseOver ? 1 : 0 }}>태그삭제</DeleteBox>
    </Container>
  );
};

export default index;
