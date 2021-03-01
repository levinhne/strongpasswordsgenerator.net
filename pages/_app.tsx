import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/globals.scss";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <RecoilRoot>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </RecoilRoot>
        </>
    );
};

export default App;
