import React from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";

const MyPost = styled.div``;

const MyLikes = styled.div``;

const MyCollections = styled.div``;

const MenuBar = ({ writtenPostsCnt, likePostsCnt, setTabState, tabState }) => {
  const postString = "게시물 " + writtenPostsCnt;
  const likesString = "좋아요 " + likePostsCnt;

  return (
    <>
      <MyPost>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={postString}
          btnTextColor={color.black.default}
          btnFontSize="15px"
          btnBorderColor="transparent"
          btnHoverBgColor="transparent"
          btnHoverBorderColor="transparent"
          btnUseOpacity={tabState === 0 ? false : true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/photo.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
          btnOnClick={() => {
            setTabState(0);
          }}
        />
      </MyPost>
      <MyLikes>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={likesString}
          btnTextColor={color.black.default}
          btnFontSize="15px"
          btnBorderColor="transparent"
          btnHoverBgColor="transparent"
          btnHoverBorderColor="transparent"
          btnUseOpacity={tabState === 1 ? false : true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/likes.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
          btnOnClick={() => {
            setTabState(1);
          }}
        />
      </MyLikes>
      {/* <MyCollections>
        <Button
          btnWidth="auto"
          btnHeight="70px"
          btnBgColor="transparent"
          btnText={collectionsString}
          btnTextColor={color.black.default}
          btnFontSize="15px"
          btnBorderColor="transparent"
          btnHoverBgColor="transparent"
          btnHoverBorderColor="transparent"
          btnUseOpacity={tabState === 2 ? false : true}
          btnSetOpacity={"0.4"}
          btnUseIcon={true}
          btnIconSrc={"/assets/icons/collection.png"}
          btnIconHeight={"18px"}
          btnIconWidth={"18px"}
          btnIconMargin={"4px 12px 0px 0px"}
          btnMarginLeft={"20px"}
          btnMarginRight={"20px"}
          btnOnClick={() => {
            setTabState(2);
          }}
        />
      </MyCollections> */}
    </>
  );
};

export default MenuBar;
