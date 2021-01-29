import "../styles/globals.scss";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { useStore } from "../store/index";
import firebase from "firebase/app";
import "firebase/storage";
import secrets from "../secrets";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  const firebaseConfig = secrets.FIREBASE_CONFIG;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <Provider store={store}>
      <Header></Header>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
