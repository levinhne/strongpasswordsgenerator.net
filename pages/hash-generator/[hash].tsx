import { useState, useRef, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useRouter, NextRouter } from "next/router";
import { pageConfig } from "../../constants/page";
import PageHead from "../../components/PageHead";

const hashMap = new Map([
    ["md5", CryptoJS.MD5],
    ["sha1", CryptoJS.SHA1],
    ["sha224", CryptoJS.SHA224],
    ["sha256", CryptoJS.SHA256],
    ["sha3", CryptoJS.SHA3],
    ["sha384", CryptoJS.SHA384],
    ["sha512", CryptoJS.SHA512],
    ["ripemd160", CryptoJS.RIPEMD160],
]);

const getPageHead = (pageHead: any, hash: string) => {
    pageHead = JSON.stringify(pageHead);
    const hashList = Array.from(hashMap.keys());
    const index = hashList.indexOf(hash);
    if (index > -1) {
        hashList.splice(index, 1);
    }
    pageHead = pageHead.replace(/\{hashName\}/g, hash.toUpperCase());
    pageHead = pageHead.replace(
        /\{hashList\}/g,
        hashList.join(", ").toUpperCase()
    );
    return JSON.parse(pageHead);
};

const HashPage: React.FC<any> = ({ hash }) => {
    const router: NextRouter = useRouter();
    const inputHashRef = useRef<HTMLInputElement>(null);
    const [hashFunction, setHashFunction] = useState<string>(hash);
    const [hashResult, setHashResult] = useState<string>("");

    const handleHash = (): void => {
        const value = String(inputHashRef.current?.value);
        if (!value) {
            return;
        }
        const result = hashMap.get(hashFunction)(String(value));
        if (result != undefined) {
            setHashResult(result.toString());
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setHashFunction(e.target.value);
        router.replace(
            "/" + e.target.value.replace("-", "") + "-hash-generator"
        );
    };

    useEffect(() => {
        setHashFunction(String(router.query.hash));
    }, [router.query]);

    return hashFunction ? (
        <>
            <PageHead {...getPageHead(pageConfig["hash"], hash)} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-lg-6 mb-4">
                            <div className="text-light text-center mb-4">
                                <h1>
                                    {`${hashFunction
                                        .replace("sha", "sha-")
                                        .toUpperCase()} Hash Generator`}
                                </h1>
                            </div>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control form-control-lg border-0 mb-1"
                                    ref={inputHashRef}
                                />
                                <div
                                    className="position-absolute"
                                    style={{
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        right: "10px",
                                    }}
                                >
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleChange(e)}
                                    >
                                        {Array.from(hashMap.keys()).map(
                                            (hashName, i) => {
                                                let selected = false;
                                                if (hashFunction == hashName) {
                                                    selected = true;
                                                }
                                                return (
                                                    <option
                                                        selected={selected}
                                                        key={i}
                                                        value={hashName}
                                                    >
                                                        {hashName
                                                            .replace(
                                                                "sha",
                                                                "sha-"
                                                            )
                                                            .toUpperCase()}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>
                            {hashResult ? (
                                <div className="text-center text-light mt-4">
                                    <div
                                        className="badge px-4 py-3 text-wrap text-break"
                                        style={{
                                            backgroundColor: "#65419a",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        {hashResult}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-outline-light fw-bold px-3 py-2"
                                    onClick={handleHash}
                                >
                                    Generator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    ) : (
        <></>
    );
};

export const getServerSideProps = async ({ params }) => {
    const hash = params.hash;
    return {
        props: { hash },
    };
};

export default HashPage;
