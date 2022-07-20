import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

const appEnv = process.env.APPLICATION_ENV === "production";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {appEnv && (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                            />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.dataLayer = window.dataLayer || [];
                                        function gtag(){dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', '${GA_TRACKING_ID}', {
                                            page_path: window.location.pathname,
                                        });
                                    `,
                                }}
                            />
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9880367516969749"
                                crossOrigin="anonymous"></script>
                        </>
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
