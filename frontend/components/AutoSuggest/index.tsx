import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileTagBox from "../ProfileTagBox";
import TagList from "../../data/TagList";

const Container = styled.div`
  position: absolute;
  top: 36px;
  width: 100%;
  background-color: ${color.white.default};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${color.gray.default};
  border-top: 0px;
  font-size: 14px;
  color: ${color.gray.darker};
  @media only screen and (max-width: 768px) {
    top: 26px;
    height: 204px;
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px 6px 16px;
  @media only screen and (max-width: 768px) {
    padding: 0px 4px 4px 4px;
  }
`;

const SuggestContainer = styled.div`
  margin: 0px 0px 4px 0px;
  @media only screen and (max-width: 768px) {
    margin: 0px 0px 0px 0px;
  }
`;

const SuggestDefault = styled.div`
  margin-top: 12px;
`;

const SuggestBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* cursor: pointer; */
  padding: 4px 0px;
  @media only screen and (max-width: 768px) {
    margin-top: 0px;
    width: 100px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 8px;
    width: 266px;
  }
  @media only screen and (min-width: 1280px) {
    width: 600px;
  }
`;

const SuggestImage = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin-top: 3px;
`;

const SuggestTitle = styled.div`
  width: 120px;
  margin: 0px 12px 0px 0px;
  font-weight: bold;
  color: ${color.black.default};
`;

const SuggestCount = styled.div`
  color: ${color.gray.dark};
`;

const index = ({ setInputFocus, setSearchTerm }) => {
  const suggestList = [
    // { type: 1, title: "이재욱여덟글자야", count: 133 },
    // { type: 2, title: "작업공간", count: 762 },
    // { type: 1, title: "구영지", count: 211 },
    // { type: 2, title: "개발자", count: 332 },
    // { type: 1, title: "한우석", count: 183 },
    // { type: 1, title: "최재웅", count: 311 },
    // { type: 2, title: "디자이너", count: 543 },
    // { type: 2, title: "스킨스쿠버", count: 192 },
  ];

  const router = useRouter();

  return (
    <Container>
      <Wrapper>
        <SuggestContainer>
          {/* <SuggestDefault>
            현재 검색어 추천 서비스에 문제가 있어 전체 태그 조회를 제공하고
            있습니다.
          </SuggestDefault> */}
          <SuggestBox>
            {TagList &&
              TagList.length > 0 &&
              TagList.map((s, index) => {
                return (
                  <ProfileTagBox
                    key={index}
                    tagId={s.tagId}
                    togglePost={() => {
                      setInputFocus(false);
                      setSearchTerm("");
                    }}
                    tagMargin={"8px 4px 0px 4px"}
                  ></ProfileTagBox>
                  // <SuggestBox
                  //   key={index}
                  //   onClick={() => {
                  //     setInputFocus(false);
                  //     router.push(`/search/${s.title}`);
                  //   }}
                  // >
                  //   <SuggestTitle>{s.title}</SuggestTitle>
                  //   <SuggestCount>
                  //     {s.type === 1 ? `팔로워 ${s.count}` : `게시물 ${s.count}`}
                  //   </SuggestCount>
                  // </SuggestBox>
                );
              })}
          </SuggestBox>
        </SuggestContainer>
      </Wrapper>
    </Container>
  );
};

export default index;
