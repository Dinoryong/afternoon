import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";

const MyPost = styled.div``;

const MyLikes = styled.div``;

const MyCollections = styled.div``;

const MenuBar = ({ profileMyposts, profileLikes, profileCollections }) => {
  const postString = "게시물 " + profileMyposts;
  const likesString = "좋아요 " + profileLikes;
  const collectionsString = "컬렉션 " + profileCollections;

  return (
    <>
      <MyPost>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={postString}
          btnTextColor={color.black.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnUseOpacity={true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/photo.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
        />
      </MyPost>
      <MyLikes>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={likesString}
          btnTextColor={color.black.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnUseOpacity={true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/likes.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
        />
      </MyLikes>
      <MyCollections>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={collectionsString}
          btnTextColor={color.black.default}
          btnFontSize="20px"
          btnBorderColor="transparent"
          btnUseOpacity={true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/collection.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
        />
      </MyCollections>
    </>
  );
};

export default MenuBar;
