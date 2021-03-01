import React from "react";
import Head from "next/head";
const PageHead: React.FC<any> = (pageConfig) => {
    return (
        <Head>
            <title>{pageConfig["title"]}</title>
            <meta name="description" content={pageConfig["description"]} />
            <meta name="keywords" content={pageConfig["keywords"].join(", ")} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="strongpasswordsgenerator.net" />
            <meta property="og:title" content={pageConfig["title"]} />
            <meta property="og:description" content={pageConfig["description"]} />
            <meta property="og:image" content="https://strongpasswordsgenerator.net/image.png" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(pageConfig["schema"]),
                }}
            />
        </Head>
    );
};

export default PageHead;
