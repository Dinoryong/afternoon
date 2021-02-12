import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const index = () => {
  const router = useRouter();

  const [redirectState, setRedirectState] = useState(false);

  useEffect(() => {
    if (!redirectState) {
      setRedirectState(true);
      router.push("/profile");
    }
  });

  return <div></div>;
};

export default index;
