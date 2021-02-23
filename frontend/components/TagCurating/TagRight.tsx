import React, { useState } from "react";
import styled from "@emotion/styled";
import color from "../../styles/theme";
import Button from "../Button";
import { ADD_TAGS, DELETE_TAGS } from "../../pages/api/profile";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";

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
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  margin: 0px 20px;
  :not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
  height: 56px;
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

const CrtTopLikes = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-left: 12px;
`;

const CrtTopContributors = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-left: 12px;
  border-radius: 50%;
  border: 1px solid ${color.gray.default};
`;

const useStore = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch({ type: "TOGGLE" });
  };
  const togglePost = async (toggleId) => {
    await dispatch({ type: "TOGGLE_POST", toggleId });
  };
  return {
    loginState,
    toggle,
    togglePost,
  };
};

const TagRight = ({
  tagState,
  writtenPostsCnt,
  tagId,
  interestedPeopleCnt,
  mostContributor,
  mostPopularPosts,
}) => {
  const router = useRouter();
  const { loginState, toggle, togglePost } = useStore();

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
    //replace_console_log(result);
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
    //replace_console_log(result);
  };

  return (
    <Container>
      <TopBox>
        <RowBox>
          <RowBoxTag>업로드 사진 수</RowBoxTag>
          <RowBoxData>{writtenPostsCnt}</RowBoxData>
        </RowBox>
        {/* <CuratingInfo>검색 결과 요약 준비 중..</CuratingInfo> */}
        <RowBox>
          <RowBoxTag>태그 팔로워 수</RowBoxTag>
          <RowBoxData>{interestedPeopleCnt}</RowBoxData>
        </RowBox>
        <RowBox>
          <RowBoxTag>인기글 TOP 3</RowBoxTag>
          <RowBoxData>
            {mostPopularPosts &&
              mostPopularPosts.map((mpp, index) => {
                return (
                  <CrtTopLikes
                    onClick={() => {
                      if (loginState) {
                        togglePost(mpp);
                      } else {
                        toggle();
                      }
                    }}
                    key={index}
                  >
                    <Image
                      src={"/assets/icons/medal_" + (index + 1) + ".png"}
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </CrtTopLikes>
                );
              })}
          </RowBoxData>
        </RowBox>
        <RowBox>
          <RowBoxTag>업로더 TOP 3</RowBoxTag>
          <RowBoxData>
            {mostContributor &&
              mostContributor.map((mc, index) => {
                return (
                  <CrtTopContributors
                    onClick={() => {
                      router.push("/search/" + mc.accountNickname);
                    }}
                    key={index}
                  >
                    <Image
                      className={"next_border_image circle"}
                      src={
                        mc.accountPhoto === ""
                          ? "/assets/icons/eye_open.png"
                          : mc.accountPhoto
                      }
                      layout="fill"
                      objectFit="cover"
                    ></Image>
                  </CrtTopContributors>
                );
              })}
          </RowBoxData>
        </RowBox>
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
