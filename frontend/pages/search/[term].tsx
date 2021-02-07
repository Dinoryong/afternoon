import React from "react";
import styled from "@emotion/styled";
import TagsCurating from "../../components/TagCurating";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 62px;
  width: 100%;
  height: 1000px;
`;

const index = () => {
  const router = useRouter();
  const routerQuery = router.query.term;

  const tagData = {
    tagTitle: "고양이방",
    tagText:
      "고양이 주인의 선택을 받은 집사들이 정성껏 마련한 고양이방을 공유합니다. 당신의 주인님이 좋아할만한 공간도 여기에서 찾을 수 있어요!",
    tagContributions: "15,600,000",
    tagUsers: "250,000",
    tagTopUser: "Frappu_dinoR",
    tagTopPost: "페이지 내의 링크 띄워주기",
    tagTopContributer: "lovegodsungbi",
  };

  return (
    <Container>
      <div>{routerQuery}</div>
      <TagsCurating tagData={tagData}></TagsCurating>
    </Container>
  );
};

export default index;
