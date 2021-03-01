import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {}, []);
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
};

export default App;
