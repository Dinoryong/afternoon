import React from "react";
import styled from "@emotion/styled";
import PinModal from "../../components/PinModal";

const Temporary = styled.div`
  display: flex;
  width: 100%;
  height: 810px;
  padding: 100px;
  justify-content: center;
  background-color: lightgray;
`;

const index = () => {
  const pinData = {
    pinTitle: "닌텐도 동물의 숲",
    pinWriter: "구영지",
    pinLink:
      "https://stackoverflow.com/questions/7554108/javascript-window-location-in-new-tab?lq=1",
    pinApi: {
      apiCategory: "게임기",
      apiLink:
        "https://search.shopping.naver.com/search/all?query=닌텐도 동물의 숲",
    },
    pinComments: [
      {
        commentWriter: "이재욱",
        commentLink:
          "https://www.coupang.com/vp/products/2112715979?itemId=3588899540&vendorItemId=71574675482&src=1032001&spec=10305201&addtag=400&ctag=2112715979&lptag=P2112715979&itime=20210201234106&pageType=PRODUCT&pageValue=2112715979&wPcid=16095070282394500033934&wRef=cr.shopping.naver.com&wTime=20210201234106&redirect=landing&isAddedCart=",
      },
      {
        commentWriter: "최재웅",
        commentLink:
          "https://smartstore.naver.com/nuclearclub/products/4812708165?NaPm=ct%3Dkkmokxmo%7Cci%3Da3945cfab2ed52854942e6504449f9e368b156a9%7Ctr%3Dslsl%7Csn%3D554739%7Chk%3D04d6cd1fe6e60cbb151162b0995491fdbbbda3ab",
      },
      {
        commentWriter: "한우석",
        commentLink:
          "https://smartstore.naver.com/shoppinglabs/products/4812747824?NaPm=ct%3Dkkmol4ko%7Cci%3Db26c9e76516d4e475413c55127829940cac6ff16%7Ctr%3Dslsl%7Csn%3D611877%7Chk%3D09affe8aeea49e8a1473dcb5ae8f0e3aba78d1d2",
      },
    ],
  };

  return (
    <Temporary>
      <PinModal pinData={pinData}></PinModal>
    </Temporary>
  );
};

export default index;
