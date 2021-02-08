import styled from "@emotion/styled";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_POST_DETAIL } from "../../pages/api/post";

const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  border-radius: 4px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 15px 20px;
`;

const ImageDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const PinFrame = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ArrowLeft = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  left: 0%;
  top: 50%;
`;

const ArrowRight = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: white;
  right: 0%;
  top: 50%;
`;

const useCounter = () => {
  const toggleId = useSelector((state) => state.post.toggleId);
  return { toggleId };
};

const index = ({ windowWidth, windowHeight }) => {
  const { toggleId } = useCounter();

  const [postState, setPostState] = useState(false);
  const [postDetail, setPostDetail] = useState({ postsPhoto: [""] });
  const [maxPhoto, setMaxPhoto] = useState(0);

  const [curPhoto, setCurPhoto] = useState(0);

  useEffect(() => {
    setMaxPhoto(postDetail.postsPhoto.length);
  }, [postDetail.postsPhoto[0]]);

  useEffect(() => {
    const getPostDetail = async () => {
      const result = await GET_POST_DETAIL(toggleId);
      if (result.status === 200) {
        setPostState(true);
        console.log(result.data.post);
        setPostDetail(result.data.post);
      } else {
        console.log("단일 포스트 데이터 에러");
      }
    };

    if (!postState) {
      getPostDetail();
    }
  });

  return (
    <Container
      style={{
        width: `${windowWidth - 240}px`,
        height: `${windowHeight - 80}px`,
      }}
    >
      <Wrapper>
        {postDetail && postDetail.postsPhoto[0] !== "" && (
          <ImageDiv>
            {postDetail.postsPhoto.map((ph, index) => {
              return (
                <div key={index}>
                  <PinFrame>
                    <ArrowLeft
                      onClick={() => {
                        setCurPhoto(
                          curPhoto === 0 ? maxPhoto - 1 : curPhoto - 1
                        );
                      }}
                    ></ArrowLeft>
                    <ArrowRight
                      onClick={() => {
                        setCurPhoto(
                          curPhoto === maxPhoto - 1 ? 0 : curPhoto + 1
                        );
                      }}
                    ></ArrowRight>
                  </PinFrame>
                  <ImageBox
                    style={curPhoto === index ? { opacity: 1 } : { opacity: 0 }}
                  >
                    <Image src={ph} layout="fill" objectFit="contain"></Image>
                  </ImageBox>
                </div>
              );
            })}
          </ImageDiv>
        )}
      </Wrapper>
    </Container>
  );
};

export default index;
