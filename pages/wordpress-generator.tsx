import React, { useState, useRef } from "react";
import { pageConfig } from "../constants/page";
import PageHead from "../components/PageHead";
import Api from "../api/api";
import * as gtag from "../lib/gtag";

const WordpressPage: React.FC = () => {
    const inputHashRef = useRef<HTMLInputElement>(null);
    const [hashResult, setHashResult] = useState<string>("");

    const handleGenerator = async () => {
        const value = String(inputHashRef.current?.value);
        if (!value) {
            return;
        }
        const result = await Api.getWordpressPasssword({ password: value });
        setHashResult(result.data.hash);
        gtag.event({
            eventAction: "click",
            eventCategory: "generator",
            eventLabel: "wordpress-generator",
            nonInteraction: true,
            eventValue: 1,
        });
    };

    return (
        <>
            <PageHead {...pageConfig["wordpress_generator"]} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-lg-6 mb-4">
                            <div className="text-light text-center mb-4">
                                <h1>Wordpress Password Generator</h1>
                            </div>
                            <div className="position-relative">
                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-0"
                                        ref={inputHashRef}
                                    />
                                    <div className="form-text text-white fw-bold fst-italic mb-2">
                                        Supported Wordpress versions 3.*, 4.*,
                                        5.*
                                    </div>
                                    <div
                                        className="position-absolute"
                                        style={{
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            right: "10px",
                                        }}
                                    ></div>
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
                                        onClick={handleGenerator}
                                    >
                                        Generator
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WordpressPage;
