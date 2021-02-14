import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const Container = styled.div`
  display: flex;
  /* width: 300px; */
  justify-content: flex-start;
  background-color: white;
  font-size: 14px;
  padding: 4px;
  margin-bottom: 8px;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-items: flex-end;
`;

const CommentImg = styled.div`
  display: flex;
  position: relative;
  /* justify-content: flex-start; */
  /* justify-items: start; */
  /* align-content: start; */
  /* align-items: start; */
  width: 30px;
  height: 30px;
  margin-top: 8px;
  margin-right: 10px;
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper3 = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  /* height: 24px; */
  margin-bottom: 4px;
`;

const CommentName = styled.div`
  display: flex;
  font-weight: bold;
  margin-right: 12px;
`;

const TagSelectBox = styled.div`
  display: flex;
  min-width: fit-content;
  background-color: ${color.gray.default};
  padding: 2px 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  /* font-weight: 500; */
  margin-right: 12px;
`;

const CommentPin = styled.div`
  display: flex;
  margin-right: 12px;
`;

const LinkBox = styled.div`
  display: flex;
  opacity: 0.6;
  cursor: pointer;
  /* border: 1px solid ${color.gray.default}; */
  border-radius: 4px;
  font-size: 13px;
`;

const CommentLink = styled.div`
  display: flex;
  width: 12px;
  height: 12px;
  position: relative;
  margin-top: 4px;
  margin-right: 2px;
`;

const Wrapper4 = styled.div`
  display: flex;
  width: 100%;
`;

const CommentContent = styled.div`
  display: flex;
  word-wrap: break-word;
`;

const index = ({ currentPin, commentData }) => {
  let accountPhoto = "/assets/logos/pinset_logo_black.png";
  if (commentData.accountPhoto !== "" && commentData.accountPhoto !== undefined)
    accountPhoto = commentData.accountPhoto;

  return (
    <Container>
      <Wrapper1>
        <CommentImg>
          <Image
            className="next_border_image circle"
            src={accountPhoto}
            layout="fill"
            objectFit="cover"
          ></Image>
        </CommentImg>
      </Wrapper1>
      <Wrapper2>
        <Wrapper3>
          <CommentName>{commentData.accountNickname}</CommentName>
          {currentPin && commentData.pinId !== null && (
            <CommentPin>#{commentData.pinName.slice(0, 10)}</CommentPin>
          )}
          {currentPin &&
            commentData.pinId !== null &&
            commentData.commentLink !== "" && (
              <LinkBox
                onClick={() => {
                  window.open(commentData.commentLink, "_blank");
                }}
              >
                <CommentLink>
                  <Image
                    src="/assets/icons/pinlink.png"
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </CommentLink>
                링크열기
              </LinkBox>
            )}
        </Wrapper3>
        <Wrapper4>
          <CommentContent>{commentData.commentContent}</CommentContent>
        </Wrapper4>
      </Wrapper2>
    </Container>
  );
};

export default index;
