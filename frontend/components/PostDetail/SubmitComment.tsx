import styled from "@emotion/styled";
import React, { useState } from "react";
import { SUBMIT_COMMENT } from "../../pages/api/post";
import color from "../../styles/theme";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const TagSelectRow = styled.div`
  display: flex;
`;

const TagSelectBox = styled.div`
  display: flex;
  min-width: fit-content;
  background-color: ${color.gray.default};
  padding: 2px 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const LinkInputBox = styled("input")`
  font-size: 14px;
  margin-left: 4px;
  width: 100%;
  border: 0px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.dark};
  }
`;

const CommentInputRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`;

const CommentInput = styled("input")`
  font-size: 14px;
  width: 100%;
  border: 0px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${color.gray.dark};
  }
`;

const SubmitCommentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  min-width: 40px;
  color: ${color.blue.default};
  cursor: pointer;
  padding: 0px 4px;
`;

const SubmitComment = ({
  loginState,
  toggle,
  togglePost,
  currentPin,
  inputComment,
  setInputComment,
  inputLink,
  setInputLink,
  requestSubmitComment,
}) => {
  return (
    <Container>
      <Wrapper>
        <TagSelectRow>
          <TagSelectBox>{currentPin.pinName.slice(0, 10)}</TagSelectBox>
          {currentPin && currentPin.pinId !== -1 && (
            <LinkInputBox
              value={inputLink}
              onChange={(e) => {
                setInputLink(e.target.value);
              }}
              placeholder={"링크 입력..."}
            ></LinkInputBox>
          )}
        </TagSelectRow>
        <CommentInputRow>
          <CommentInput
            value={inputComment}
            onChange={(e) => {
              setInputComment(e.target.value);
            }}
            placeholder={"댓글 달기..."}
          ></CommentInput>
          <SubmitCommentButton
            onClick={
              !loginState
                ? () => {
                    togglePost();
                    toggle();
                  }
                : requestSubmitComment
            }
          >
            게시
          </SubmitCommentButton>
        </CommentInputRow>
      </Wrapper>
    </Container>
  );
};

export default SubmitComment;
