import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import TagList from "../../data/TagList";
import color from "../../styles/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: fit-content;
  color: ${color.gray.darker};
  border: 1px solid ${color.gray.light};
  background-color: ${color.gray.light};
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  width: 55px;
  min-width: fit-content;
  font-size: 13px;
  padding: 4px 1px;
`;

const TextBox = styled.div`
  transition: all 0.3s;
`;

const DeleteBox = styled.div`
  position: absolute;
  transition: all 0.3s;
  color: ${color.black.default};
`;

const useStore = () => {
  const toggleId = useSelector((state: RootStateOrAny) => state.post.toggleId);
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const togglePost = async () => {
    dispatch({ type: "TOGGLE_POST" });
  };

  return { toggleId, loginState, toggle, togglePost };
};

const DeleteTagBoxSmall = ({
  tagId = 1,
  tagMargin = "0px",
  tagOnClick = () => {},
  tagUseDelete = true,
}) => {
  const router = useRouter();
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
        backgroundColor: mouseOver ? "white" : color.gray.light,
        margin: tagMargin,
        borderColor: mouseOver ? color.black.default : color.gray.light,
      }}
    >
      <TextBox style={mouseOver ? { opacity: 0 } : { opacity: 1 }}>
        {tagInfo.tagTitle}
      </TextBox>
      <DeleteBox style={{ opacity: mouseOver ? 1 : 0 }}>태그삭제</DeleteBox>
    </Container>
  );
};

export default DeleteTagBoxSmall;
