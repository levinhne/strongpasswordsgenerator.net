import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import ReactGA from "react-ga";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/globals.scss";
import { useEffect } from "react";

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        ReactGA.initialize("G-SZM2QWC7T5");
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);
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
