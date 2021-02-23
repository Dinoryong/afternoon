import React from "react";
import styled from "@emotion/styled";
import TagLeft from "./TagLeft";
import TagRight from "./TagRight";
import TagList from "../../data/TagList";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
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
