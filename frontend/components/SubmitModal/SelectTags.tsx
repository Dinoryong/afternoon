import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";
import SelectTagBox from "./SelectTagBox";
import TagList from "../../data/TagList";

const Container = styled.div`
  position: absolute;
  top: 73px;
  width: 380px;
  background-color: ${color.white.default};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid ${color.gray.default};
  border-top: 0px;
  font-size: 14px;
  color: ${color.gray.darker};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px 6px 16px;
`;

const SuggestContainer = styled.div`
  margin: 0px 0px 4px 0px;
`;

const SuggestDefault = styled.div`
  margin-top: 12px;
`;

const SuggestBox = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  /* cursor: pointer; */
  margin-top: 8px;
  padding: 4px 0px;
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

const SelectTags = ({ setSelectTagList, selectTagList, setToggleTags }) => {
  const router = useRouter();
  const filterTagList = TagList.filter(
    (t) => selectTagList.findIndex((s) => s === t.tagId) < 0
  );
  //   //replace_console_log(filterTagList);

  return (
    <Container>
      <Wrapper>
        <SuggestContainer>
          <SuggestDefault>원하시는 태그를 선택해주세요.</SuggestDefault>
          <SuggestBox>
            {filterTagList &&
              filterTagList.length > 0 &&
              filterTagList.map((s, index) => {
                return (
                  <SelectTagBox
                    key={index}
                    tagId={s.tagId}
                    tagOnClick={() => {
                      setSelectTagList([...selectTagList, s.tagId]);
                      setToggleTags(false);
                    }}
                    tagMargin={"8px 4px 0px 4px"}
                  ></SelectTagBox>
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

export default SelectTags;
