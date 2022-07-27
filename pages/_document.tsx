import NextDocument, { Head, Html, Main, NextScript } from "next/document";

const appEnv = process.env.APPLICATION_ENV === "production";

class Document extends NextDocument {
  render() {
    return (
      <Html lang="vi">
        <Head>{appEnv && <></>}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
