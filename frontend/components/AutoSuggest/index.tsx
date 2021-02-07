import React from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import { useRouter } from "next/router";

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
  align-items: center;
  cursor: pointer;
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
  margin: 0px 12px;
  font-weight: bold;
  color: ${color.black.default};
`;

const SuggestCount = styled.div`
  color: ${color.gray.dark};
`;

const index = ({ setInputFocus }) => {
  const suggestList = [
    { type: 1, title: "이재욱여덟글자야", count: 133 },
    { type: 2, title: "작업공간", count: 762 },
    { type: 1, title: "구영지", count: 211 },
    { type: 2, title: "개발자", count: 332 },
    { type: 1, title: "한우석", count: 183 },
    { type: 1, title: "최재웅", count: 311 },
    { type: 2, title: "디자이너", count: 543 },
    { type: 2, title: "스킨스쿠버", count: 192 },
  ];

  const router = useRouter();

  return (
    <Container>
      <Wrapper>
        <SuggestContainer>
          {suggestList && suggestList.length === 0 && (
            <SuggestDefault>
              검색어를 입력하시면 관련 태그 혹은 사용자가 표시됩니다
            </SuggestDefault>
          )}
          {suggestList &&
            suggestList.length > 0 &&
            suggestList.map((s, index) => {
              return (
                <SuggestBox
                  key={index}
                  onClick={() => {
                    setInputFocus(false);
                    router.push(`/search/${s.title}`);
                  }}
                >
                  <SuggestImage>
                    <Image
                      src={
                        s.type === 1
                          ? "/assets/icons/user_icon.png"
                          : "/assets/icons/tag_icon.png"
                      }
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </SuggestImage>
                  <SuggestTitle>{s.title}</SuggestTitle>
                  <SuggestCount>
                    {s.type === 1 ? `팔로워 ${s.count}` : `게시물 ${s.count}`}
                  </SuggestCount>
                </SuggestBox>
              );
            })}
        </SuggestContainer>
      </Wrapper>
    </Container>
  );
};

export default index;
