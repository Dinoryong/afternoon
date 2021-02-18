import React from "react";
import Button from "../../components/Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";
import TagList from "../../data/TagList";

const TagRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 180px;
  min-width: 180px;
  min-height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  color: ${color.white.default};
  font-size: 20px;
  :hover {
    font-size: 24px;
  }
  transition: all 0.2s;
`;

const TagImg = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const TagTitle = styled.div`
  height: 40px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  pointer-events: none;
  height: 30px;
  /* text-shadow: 0px 0px 2px white; */
`;

const BgOpacityFrame = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  /* opacity: 0.2; */
  border-radius: 8px;
  :hover {
    /* opacity: 0.7; */
  }
  transition: all 0.3s;
`;

const PreferTags = ({ selectTags, setSelectTags }) => {
  const MAX_ROW = 4;
  const MAX_COL = TagList.length / MAX_ROW;
  let tagRows = 1;

  let tagRowList = [];

  for (let tagCols = 0; tagCols < MAX_COL; tagCols++) {
    tagRowList.push(TagList.slice(tagCols * MAX_ROW, tagRows++ * MAX_ROW));
  }

  return (
    <>
      {tagRowList &&
        tagRowList.length !== 0 &&
        tagRowList.map((tg, index) => (
          <TagRow key={index}>
            {tg &&
              tg.map((t, index) => (
                <TagBox
                  onClick={() => {
                    if (selectTags.findIndex((x) => x === t.tagId) < 0)
                      setSelectTags([...selectTags, t.tagId]);
                    else setSelectTags(selectTags.filter((x) => x !== t.tagId));
                  }}
                  key={index}
                >
                  <TagImg>
                    <Image
                      className="next_border_image"
                      src={t.tagSrc}
                      layout="fill"
                      objectFit="cover"
                    ></Image>
                  </TagImg>
                  <BgOpacityFrame
                    style={
                      selectTags.findIndex((x) => x === t.tagId) >= 0
                        ? { backgroundColor: "rgba(0,0,0,0.8)" }
                        : { backgroundColor: "rgba(0,0,0,0.3)" }
                    }
                  ></BgOpacityFrame>
                  <TagTitle>{t.tagTitle}</TagTitle>
                </TagBox>
              ))}
          </TagRow>
        ))}
    </>
  );
};

export default PreferTags;
