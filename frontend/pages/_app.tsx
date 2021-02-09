import { useState } from "react";
import { Provider } from "react-redux";
import "../styles/globals.scss";
import firebase from "firebase/app";
import "firebase/storage";
import { useStore } from "../store/index";
import Header from "../components/Header";
import LoginLoading from "../components/LoginLoading";
import secrets from "../secrets";

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState);

  const [renderState, setRenderState] = useState(false);

  const firebaseConfig = secrets.FIREBASE_CONFIG;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <Provider store={store}>
      {!renderState ? (
        <LoginLoading setRenderState={setRenderState}></LoginLoading>
      ) : (
        <>
          <Header></Header>
          <Component {...pageProps} />
        </>
      )}
    </Provider>
  );
};

export default MyApp;
