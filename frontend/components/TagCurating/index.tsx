import React from "react";
import styled from "@emotion/styled";
import TagLeft from "./TagLeft";
import TagRight from "./TagRight";
import TagList from "../../data/TagList";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    max-width: 90%;
  }
  @media only screen and (min-width: 768px) {
    max-width: 720px;
  }
  @media only screen and (min-width: 1280px) {
    max-width: 1000px;
  }
`;

const index = ({ searchData, routerQuery }) => {
  const currentTag = TagList.find((x) => x.tagTitle === routerQuery);

  return (
    <>
      {currentTag && currentTag.tagTitle && (
        <Container>
          <TagLeft
            tagTitle={currentTag.tagTitle}
            tagDesc={currentTag.tagDesc}
          />
          <TagRight
            tagState={searchData.tagState}
            writtenPostsCnt={searchData.writtenPostsCnt}
            interestedPeopleCnt={searchData.interestedPeopleCnt}
            mostContributor={searchData.mostContributor}
            mostPopularPosts={searchData.mostPopularPosts}
            tagId={currentTag.tagId}
          />
        </Container>
      )}
    </>
  );
};

export default index;
