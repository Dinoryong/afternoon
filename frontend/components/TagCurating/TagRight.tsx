import React, { useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";
import { ADD_TAGS, DELETE_TAGS } from "../../pages/api/profile";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  width: 450px;
  min-width: 400px;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 80px;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 15px;
  border: 1px solid lightgray;
  border-radius: 4px;
`;

const RowBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  margin: 0px 20px;
  :not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
`;

const CuratingInfo = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  /* font-weight: 700; */
`;

const RowBoxTag = styled.div`
  display: flex;
`;

const RowBoxData = styled.div`
  display: flex;
`;

const BottomBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const LikeTag = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };

  return {
    loginState,
    toggle,
  };
};

const TagRight = ({ tagState, writtenPostsCnt, tagId }) => {
  const { loginState, toggle } = useStore();

  const [tagBtnState, setTagBtnState] = useState(tagState);

  const requestAddTags = async () => {
    setTagBtnState(true);
    const addTagsReq = { tags: [tagId] };
    const headerConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await ADD_TAGS(addTagsReq, headerConfig);
    console.log(result);
  };

  const requestDeleteTags = async () => {
    setTagBtnState(false);
    const deleteTagsReq = tagId;
    const deleteTagsConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await DELETE_TAGS(deleteTagsReq, deleteTagsConfig);
    console.log(result);
  };

  return (
    <Container>
      <TopBox>
        <RowBox>
          <RowBoxTag>등록된 게시물</RowBoxTag>
          <RowBoxData>{writtenPostsCnt}</RowBoxData>
        </RowBox>
        <CuratingInfo>검색 결과 요약 준비 중..</CuratingInfo>
        {/* <RowBox>
          <RowBoxTag>등록한 사용자</RowBoxTag>
          <RowBoxData>163</RowBoxData>
        </RowBox>
        <RowBox>
          <RowBoxTag>좋아요 TOP 5</RowBoxTag>
          <RowBoxData>난재</RowBoxData>
        </RowBox>
        <RowBox>
          <RowBoxTag>게시물 TOP 5</RowBoxTag>
          <RowBoxData>난재</RowBoxData>
        </RowBox> */}
      </TopBox>
      <BottomBox>
        <LikeTag>
          <Button
            btnBgColor={color.black.default}
            btnWidth="100%"
            btnMarginLeft="0px"
            btnMarginRight="0px"
            btnText={
              tagBtnState ? "내 관심태그에서 삭제" : "내 관심태그로 추가"
            }
            btnFontSize="15px"
            btnTextColor={color.white.default}
            btnHeight="40px"
            btnFontWeight={700}
            btnBorderColor={color.black.default}
            btnHoverBorderColor="transparent"
            btnHoverBgColor={color.gray.dark}
            btnHoverTextColor={color.white.default}
            btnOnClick={
              !loginState
                ? toggle
                : tagBtnState
                ? requestDeleteTags
                : requestAddTags
            }
          />
        </LikeTag>
      </BottomBox>
    </Container>
  );
};

export default TagRight;
