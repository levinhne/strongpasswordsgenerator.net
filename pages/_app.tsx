import type { AppProps } from "next/app";
import DefaultLayout from "../components/Layout/DefaultLayout";
import "../styles/application.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default App;