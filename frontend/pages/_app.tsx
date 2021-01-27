import "../styles/globals.scss";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { useStore } from "../store/index";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Header></Header>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
