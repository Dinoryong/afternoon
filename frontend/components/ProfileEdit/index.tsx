import React, { useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Button";
import color from "../../styles/theme";
import Image from "next/image";
import firebase from "firebase";
import { useRouter } from "next/router";
import { EDIT_PROFILE } from "../../pages/api/profile";

const Container = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  position: absolute;
  z-index: 10;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.92);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 35px;
  padding-right: 35px;
  border-radius: 10px;
  font-size: 15px;
  top: 122px;
`;

const EditBox = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

const Xbutton = styled.div`
  width: 17px;
  height: 17px;
  background-color: "transparent";
  position: absolute;
  top: 22px;
  right: 22px;
  cursor: pointer;
`;

const EditTitle = styled.div`
  display: flex;
  font-weight: bold;
  width: 100px;
  height: 20px;
  position: absolute;
  top: 22px;
  left: 22px;
`;

const ImgBox = styled.div`
  display: flex;
  position: relative;
  width: 140px;
  height: 140px;
  margin: 30px 0px 10px 0px;
`;

const EditPhoto = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const PhotoInput = styled("input")`
  display: none;
`;

const NameTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const InputName = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  ::placeholder {
    font-size: 15px;
  }
  :focus {
    outline: none;
  }
`;

const NicknameTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const InputNickname = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 2px 10px;
  ::placeholder {
  }
  :focus {
    outline: none;
  }
`;

const BioTitle = styled.div`
  display: flex;
  width: 300px;
  height: 20px;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const InputBio = styled.textarea`
  display: flex;
  width: 300px;
  margin: 5px 0px;
  border: solid 2px ${color.gray.default};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  ::placeholder {
  }
  :focus {
    outline: none;
  }
  margin-bottom: 10px;
`;

const EditButton = styled.div`
  display: flex;
  width: 300px;
  height: 45px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const index = ({
  toggleEdit,
  accountPhoto = "/assets/logos/pinset_logo_black.png",
  accountName,
  accountNickname,
  accountBio,
}) => {
  const router = useRouter();
  const inputFile = useRef(null);

  const storage = firebase.storage();

  const [nameInput, setNameInput] = useState(accountName);
  const [nicknameInput, setNicknameInput] = useState(accountNickname);
  const [bioInput, setBioInput] = useState(accountBio);
  const [profileAsFile, setProfileAsFile] = useState({
    image: null,
    url: accountPhoto,
    progress: 0,
  });

  if (accountPhoto === "") accountPhoto = "/assets/logos/pinset_logo_black.png";

  // accountName accountNickname accountPhoto accountBio => 200 문제 시 400

  const requestEditProfile = async () => {
    const editProfileReq = {
      accountName: nameInput,
      accountNickname: nicknameInput,
      accountPhoto: profileAsFile.url,
      accountBio: bioInput,
    };
    const editProfileConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
      },
    };

    const result = await EDIT_PROFILE(editProfileReq, editProfileConfig);
    console.log(result);

    if (result.status === 200) {
      toggleEdit();
      router.push("/submit");
    }
  };

  const uploadToFirebase = (image) => {
    console.log("FIREBASE : UPLOAD");
    // async magic goes here...
    const imageId = makeid(16);

    if (image === null) {
      console.error(`not an image, the image file is a ${typeof image}`);
    }
    const uploadTask = storage.ref(`/images/${imageId}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        setProfileAsFile({
          ...profileAsFile,
          progress: Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          ),
        });
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(imageId)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setProfileAsFile({
              image: image,
              url: fireBaseUrl,
              progress: 100,
            });
          });
      }
    );
  };

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileChange = (e) => {
    let image = e.target.files[0];
    uploadToFirebase(image);
  };

  return (
    <Container>
      <EditBox>
        <EditTitle>프로필 수정</EditTitle>
        <Xbutton onClick={toggleEdit}>
          <Image
            src="/assets/icons/x_mark.png"
            layout="fill"
            objectFit="contain"
          ></Image>
        </Xbutton>
      </EditBox>
      <ImgBox>
        {profileAsFile && profileAsFile.url === "" && (
          <Image
            className="next_border_image circle"
            src={accountPhoto}
            layout="fill"
            objectFit="cover"
          ></Image>
        )}
        {profileAsFile && profileAsFile.url !== "" && (
          <Image
            className="next_border_image circle"
            src={profileAsFile.url}
            layout="fill"
            objectFit="cover"
          ></Image>
        )}
        <EditPhoto onClick={onButtonClick}></EditPhoto>
        <PhotoInput
          type="file"
          id="file"
          ref={inputFile}
          onChange={(e) => handleFileChange(e)}
        ></PhotoInput>
      </ImgBox>
      <NameTitle>이름</NameTitle>
      <InputName
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      ></InputName>
      <NicknameTitle>닉네임</NicknameTitle>
      <InputNickname
        value={nicknameInput}
        onChange={(e) => setNicknameInput(e.target.value)}
      ></InputNickname>
      <BioTitle>소개글</BioTitle>
      <InputBio
        rows={5}
        value={bioInput}
        onChange={(e) => setBioInput(e.target.value)}
      ></InputBio>
      <EditButton>
        <Button
          btnBgColor={color.green.default}
          btnWidth="300px"
          btnText="프로필 업데이트"
          btnTextColor={color.white.default}
          btnHeight="40px"
          btnFontWeight={700}
          btnBorderColor="transparent"
          btnHoverBorderColor="transparent"
          btnHoverBgColor={color.red.dark}
          btnHoverTextColor={color.white.default}
          btnOnClick={requestEditProfile}
        />
      </EditButton>
    </Container>
  );
};

export default index;
