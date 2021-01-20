import React from "react";
// import Button from "../../components/Buttons"
import styled from "@emotion/styled";


const Container = styled.div`
	display: flex;
	flex-direction: column;
  width: 350px;
	height: 500px;
	background-color: yello;
	border: 2px solid #aaaaaa;
	border-radius: 20px;
	justify-content: flex-end;
	align-items: center;
`;

const Modal = styled.div`
	width: 320px;
	height: 450px;
	display: grid;
	background-color: yellow;
	padding-top: 70px;
	padding-left: 30px;
	margin: auto;
	border-radius: 4px;

`;

const ModalTitle = styled.div`
	font-size: 22px;
	font-weight: bold;
	font-display: center;
`;

const ModalText = styled.div` 
	font-size: 13px;
	font-display: center;
`;

const InputNickname = styled.div`
	display: flex;
	width: 300px;
	height: 40px;
	border: black;
	border-radius: 4px;
	margin-top: 20px;
	margin-bottom: 10px;
	background-color: white;
`;

const InputEmail = styled.div`
	display: flex;
	width: 300px;
	height: 40px;
	border: black;
	border-radius: 4px;
	margin-top: 5px;
	margin-bottom: 10px;
	background-color: white;
`;

const index = () => {
	return (
			<Container>
				<Modal>
					<ModalTitle>PINSET에 오신 것을 환영합니다</ModalTitle>
					<ModalText>당신의 공간을 공유하세요</ModalText>
					<InputNickname></InputNickname>
					<InputEmail></InputEmail>
					<ModalText>다른 SNS 계정으로 공유하기</ModalText>
					<ModalText>이미 회원이신가요?</ModalText>
					<ModalText>로그인하기</ModalText>					
				</Modal>
			</Container>
	);
};

export default index;