import { AppProps, NextWebVitalsMetric } from "next/app";
import { useEffect } from "react";
import { useRouter, NextRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as gtag from "../lib/gtag";

import "../styles/globals.scss";

const App = ({ Component, pageProps }: AppProps) => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);
    return (
        <>
            <Header />
            <Component {...pageProps} />
            <div className="text-center py-2">
                <ins className="adsbygoogle"
                    style={{ display: "inline-block", width: "728px", height: "90px" }}
                    data-ad-client="ca-pub-9880367516969749"
                    data-ad-slot="9514926502"></ins>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (adsbygoogle = window.adsbygoogle || []).push({ });
                        `,
                    }}
                />
            </div>
            <Footer />
        </>
    );
};

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (metric.label === "web-vital") {
        console.log(metric); // The metric object ({ id, name, startTime, value, label }) is logged to the console
    }
}

export default App;
