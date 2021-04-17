import { useState, useRef, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useRouter, NextRouter } from "next/router";
import { pageConfig } from "../../constants/page";
import PageHead from "../../components/PageHead";

const HashPage: React.FC<any> = ({ hash }) => {
    const router: NextRouter = useRouter();
    const { query } = router.query;
    const inputHashRef = useRef<HTMLInputElement>(null);
    const [hashFunction, setHashFunction] = useState<string>(hash);
    const [hashResult, setHashResult] = useState<string>("");

    const handleHash = (): void => {
        const value = String(inputHashRef.current?.value);
        if (!value) {
            return;
        }
        const result = getHash(hashFunction, String(value));
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
        if (!query) return;
        setHashFunction(
            String(query).replace("-hash-generator", "").replace("sha", "sha-")
        );
    }, [query]);

    return hashFunction ? (
        <>
            <PageHead {...pageConfig["hash"][String(hash)]} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-lg-7 mb-4">
                            <div className="text-light text-center mb-4">
                                <h1>
                                    {`${hashFunction.toUpperCase()} Hash Generator`}
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
                                        {[
                                            "md5",
                                            "sha-1",
                                            "sha-256",
                                            "sha-512",
                                        ].map((value, i) => {
                                            let selected = false;
                                            if (
                                                hashFunction ==
                                                value.replace("-", "")
                                            ) {
                                                selected = true;
                                            }
                                            return (
                                                <option
                                                    selected={selected}
                                                    key={i}
                                                    value={value}
                                                >
                                                    {value.toUpperCase()}
                                                </option>
                                            );
                                        })}
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

const getHash = (
    func: string,
    str: string
): CryptoJS.lib.WordArray | undefined => {
    switch (func.replace("-", "")) {
        case "md5":
            return CryptoJS.MD5(str);
        case "sha1":
            return CryptoJS.SHA1(str);
        case "sha256":
            return CryptoJS.SHA256(str);
        case "sha512":
            return CryptoJS.SHA512(str);
        default:
            return undefined;
    }
};

export const getServerSideProps = async ({ params }) => {
    const hash = params.hash;
    return {
        props: { hash },
    };
};

export default HashPage;
