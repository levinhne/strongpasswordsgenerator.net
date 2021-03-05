import { useState, useRef } from "react";
import CryptoJS from "crypto-js";
import { Button, Container } from "react-bootstrap-v5";

const HashPage: React.FC = () => {
    const inputHashRef = useRef<HTMLInputElement>(null);
    const [hashFunction, setHashFunction] = useState<string>();
    const [hashResult, setHashResult] = useState<string>("");
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setHashFunction(e.target.value.replace("-", ""));
    };

    const handleHash = (): void => {
        const result = getHash(
            hashFunction,
            String(inputHashRef.current?.value)
        );
        if (result != undefined) {
            setHashResult(result.toString());
        }
    };

    return (
        <section
            className="py-5"
            style={{ background: "linear-gradient(#614092, #7952b3)" }}
        >
            <Container>
                <div className="row justify-content-md-center">
                    <div className="col-12 col-lg-6 mb-4">
                        <div className="text-light text-center mb-4">
                            <h1>Hash Generator</h1>
                        </div>
                        <input
                            type="text"
                            className="form-control form-control-lg border-0"
                            ref={inputHashRef}
                        />
                        <div className="mt-2">
                            {["md5", "sha-1", "sha-256", "sha-512"].map(
                                (value, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="form-check form-check-inline"
                                        >
                                            <input
                                                className="form-check-input border-0"
                                                name="type"
                                                type="radio"
                                                value={value}
                                                onChange={(e) =>
                                                    handleOnChange(e)
                                                }
                                            />
                                            <label className="form-check-label text-white">
                                                {value.toLocaleUpperCase()}
                                            </label>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    {hashResult ? (
                        <div className="col-12 col-lg-10 ">
                            <div className="text-center text-light">
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
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="text-center my-4">
                        <Button
                            type="submit"
                            className="btn btn-lg btn-outline-light fw-bold px-3 py-2"
                            onClick={handleHash}
                        >
                            Generator
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

const getHash = (
    func: string,
    str: string
): CryptoJS.lib.WordArray | undefined => {
    switch (func) {
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

export default HashPage;
