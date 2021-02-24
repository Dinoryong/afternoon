import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import TagCurating from "../../components/TagCurating";
import UserCurating from "../../components/UserCurating";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  SEARCH_LOGIN_TAG,
  SEARCH_LOGIN_USER,
  SEARCH_LOGOUT_TAG,
  SEARCH_LOGOUT_USER,
} from "../api/search";
import TagList from "../../data/TagList";
import { RootStateOrAny, useSelector } from "react-redux";
import color from "../../styles/theme";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding-top: 62px;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  @media only screen and (max-width: 768px) {
    margin-top: 20px;
  }
  @media only screen and (min-width: 768px) {
    margin-top: 40px;
  }
  @media only screen and (min-width: 1280px) {
    margin-top: 60px;
  }
`;

const DynamicDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
`;

const NullDiv = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const NullTagAdd = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const NullTagAddBtn = styled.div`
  padding: 4px 8px;
  background-color: ${color.green.dark};
  margin-right: 8px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
`;

const useCounter = () => {
  const loginState = useSelector(
    (state: RootStateOrAny) => state.login.loginState
  );

  return { loginState };
};

const index = () => {
  const router = useRouter();
  const routerQuery = router.query.term;

  const [tagData, setTagData] = useState({});
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [isTag, setIsTag] = useState(0);
  const [termExist, setTermExist] = useState(true);
  const [searchApiState, setSearchApiState] = useState(false);

  const { loginState } = useCounter();

  const isTagCheck = async () => {
    if (TagList.findIndex((t) => t.tagTitle === routerQuery) >= 0) {
      setIsTag(1);
    } else {
      setIsTag(2);
    }
  };

  const DynamicComponentWithNoSSR = dynamic(
    () => import("../../components/Egjs"),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    setPostData([]);
    setSearchApiState(false);
    setTermExist(true);
    setIsTag(0);
  }, [routerQuery]);

  useEffect(() => {
    const requestSearch = async () => {
      const getResult = async () => {
        const searchLoginReq = routerQuery;
        if (loginState) {
          const searchLoginConfig = {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "authToken"
              )}`,
            },
          };

          if (isTag == 1) {
            return await SEARCH_LOGIN_TAG(searchLoginReq, searchLoginConfig);
          } else if (isTag == 2) {
            return await SEARCH_LOGIN_USER(searchLoginReq, searchLoginConfig);
          }
        } else {
          if (isTag == 1) {
            return await SEARCH_LOGOUT_TAG(searchLoginReq);
          } else if (isTag == 2) {
            return await SEARCH_LOGOUT_USER(searchLoginReq);
          }
        }
      };

      const result = await getResult();
      //replace_console_log(result);

      if (result.status === 200) {
        setTermExist(true);
        if (loginState) {
          setPostData(result.data.writtenPosts);
          if (isTag === 1) {
            setTagData(result.data);
          } else if (isTag === 2) {
            setUserData(result.data);
          }
        } else {
          setPostData(result.data.writtenPosts.slice(0, 20));
          if (isTag === 1) {
            setTagData(result.data);
          } else if (isTag === 2) {
            setUserData(result.data);
          }
        }
      } else if (result.status === 204) {
        setTermExist(false);
      }
    };

    if (routerQuery !== undefined && isTag === 0) {
      isTagCheck(); // tag = 0 : router 변경된 경우 초기값, 1 : 검색어가 태그인 경우, 2 : 검색어가 사용자인 경우
    }

    if (!searchApiState) {
      if (routerQuery !== undefined && isTag !== 0) {
        setSearchApiState(true);
        requestSearch();
      }
    }
  });

  return (
    <Container>
      {routerQuery !== undefined && termExist && (
        <Wrapper>
          {isTag !== 0 &&
            isTag == 1 &&
            tagData &&
            Object.keys(tagData).length > 0 && (
              <TagCurating
                searchData={tagData}
                routerQuery={routerQuery}
              ></TagCurating>
            )}
          {isTag !== 0 &&
            isTag == 2 &&
            userData &&
            Object.keys(userData).length > 0 && (
              <UserCurating searchData={userData}></UserCurating>
            )}
          <DynamicDiv>
            {postData && Object.keys(postData).length > 0 && (
              <DynamicComponentWithNoSSR
                postData={postData}
              ></DynamicComponentWithNoSSR>
            )}
          </DynamicDiv>
        </Wrapper>
      )}
      {routerQuery !== undefined && !termExist && (
        <Wrapper>
          <NullDiv>등록되지 않은 태그 또는 사용자입니다</NullDiv>
          <NullTagAdd>검색하신 "{routerQuery}" 태그를 추가하시려면</NullTagAdd>
          <NullTagAdd>
            <NullTagAddBtn
              onClick={() => {
                setTimeout(() => {
                  Swal.fire({
                    title: "태그 등록신청 성공",
                    text: "태그 검토 후 빠른 시일 내에 추가하겠습니다",
                    icon: "success",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      router.push("/feed");
                    }
                  });
                }, 500);
              }}
            >
              태그 등록신청
            </NullTagAddBtn>
            버튼을 눌러주세요
          </NullTagAdd>
        </Wrapper>
      )}
    </Container>
  );
};

export default index;
