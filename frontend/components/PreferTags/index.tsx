import React from "react";
import Button from "../../components/Button";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Image from "next/image";

const TagRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

type TagInfo = {
  name?: string;
  image?: string;
};

const TagImg = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
	height: 100%;
	border-radius: 8px;
`;

const TagBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 260px;
  height: 150px;
  background-color: gray;
  justify-content: center;
	align-items: center;
	border-radius: 8px;
`;

const TagTitle = styled.div`
	display: flex;
	position: absolute;
  justify-content: center;
  color: ${color.white.default};
  font-size: 30px;
  font-weight: 700;
`;

const BgOpacityFrame = styled.div`
	position: absolute;
	display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
	opacity: 0.3;
	border-radius: 8px;
`;

const PreferTags = () => {
  const TagArray: TagInfo[] = [
    { name: "designer space", image: "/assets/images/designer_desk.jpg" },
    { name: "engineer space", image: "/assets/images/designer_desk.jpg" },
    { name: "chef space", image: "/assets/images/designer_desk.jpg" },
    { name: "bathroom", image: "/assets/images/designer_desk.jpg" },
    { name: "den", image: "/assets/images/designer_desk.jpg" },
    { name: "terrace", image: "/assets/images/designer_desk.jpg" },
    { name: "ski", image: "/assets/images/designer_desk.jpg" },
    { name: "camping", image: "/assets/images/designer_desk.jpg" },
    { name: "scuber diving", image: "/assets/images/designer_desk.jpg" },
    { name: "tennis", image: "/assets/images/designer_desk.jpg" },
    { name: "toy", image: "/assets/images/designer_desk.jpg" },
    { name: "climbing", image: "/assets/images/designer_desk.jpg" },
    { name: "photographer", image: "/assets/images/designer_desk.jpg" },
    { name: "painter", image: "/assets/images/designer_desk.jpg" },
    { name: "kids room", image: "/assets/images/designer_desk.jpg" },
    { name: "wine bar", image: "/assets/images/designer_desk.jpg" },
  ];

  const MAX_COUNt = 4;
  let tagRows = 0;

  const tagSlice1 = TagArray.slice(
    tagRows * MAX_COUNt,
    (tagRows++ + 1) * MAX_COUNt
  );
  const tagSlice2 = TagArray.slice(
    tagRows * MAX_COUNt,
    (tagRows++ + 1) * MAX_COUNt
  );
  const tagSlice3 = TagArray.slice(
    tagRows * MAX_COUNt,
    (tagRows++ + 1) * MAX_COUNt
  );
  const tagSlice4 = TagArray.slice(
    tagRows * MAX_COUNt,
    (tagRows++ + 1) * MAX_COUNt
  );

  let tagSliceGroup = [];
  tagSliceGroup.push(tagSlice1);
  tagSliceGroup.push(tagSlice2);
  tagSliceGroup.push(tagSlice3);
  tagSliceGroup.push(tagSlice4);

  return (
    <>
      {tagSliceGroup &&
        tagSliceGroup.map((tg, index) => (
          <TagRow key={index}>
            {tg &&
              tg.map((t, index) => (
                <TagBox key={index}>
                  <TagImg>
                    <Image
											className="next_border_image"
                      src={t.image}
                      layout="fill"
											objectFit="cover"
                    ></Image>
                  </TagImg>
                  <BgOpacityFrame></BgOpacityFrame>
                  <TagTitle>{t.name}</TagTitle>
                </TagBox>
              ))}
          </TagRow>
        ))}
    </>
  );
};

export default PreferTags;
