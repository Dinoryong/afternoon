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
  width: fit-content;
  min-width: fit-content;
  padding: 4px 8px;
  font-size: 14px;
  color: ${color.gray.darker};
  border: 1px solid ${color.gray.light};
  background-color: ${color.gray.light};
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
`;

const TextBox = styled.div`
  transition: all 0.3s;
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

const SelectTagBox = ({
  tagId = 1,
  tagMargin = "0px",
  tagOnClick = () => {},
}) => {
  const router = useRouter();

  const tagInfo = TagList[tagId - 1];

  return (
    <Container
      onClick={tagOnClick}
      style={{
        // backgroundColor: mouseOver ? "white" : tagInfo.tagColor,
        margin: tagMargin,
        // borderColor: mouseOver ? color.black.default : tagInfo.tagColor,
      }}
    >
      <TextBox>{tagInfo.tagTitle}</TextBox>
    </Container>
  );
};

export default SelectTagBox;
