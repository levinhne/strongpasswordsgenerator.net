import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import Image from "next/image";
import generator from "generate-password";
import FileSaver from "file-saver";
import { useRouter, NextRouter } from "next/router";
import GA4React from "ga-4-react";
import PageHead from "../components/PageHead";
import { pageConfig } from "../constants/page";

interface GenerateOptions extends generator.GenerateOptions {
    blur?: boolean;
}

const GeneratorPage: React.FC = () => {
    const router: NextRouter = useRouter();
    const [password, setPassword] = useState<string>("");
    const [iconActions, setIconActions] = useState({
        clipboard: {
            text: "Copy to clipboard",
            icon: "clipboard.svg",
        },
        scan: "upc-scan.svg",
        download: "file-earmark-arrow-down.svg",
    });
    const [generatorOption, setGeneratorOption] = useState<GenerateOptions>({
        length: 16,
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
        exclude: "",
        blur: false,
    });

    const handleChange = (e: any) => {
        switch (e.target.type) {
            case "checkbox":
                setGeneratorOption({
                    ...generatorOption,
                    [e.target.name]: e.target.checked ? true : false,
                });
                break;
            default:
                setGeneratorOption({
                    ...generatorOption,
                    [e.target.name]: e.target.value,
                });
                break;
        }
    };

    const handleGenerator = (): void => {
        setPassword(generator.generate(generatorOption));
        for (const [key, value] of Object.entries(generatorOption)) {
            if (value == false || value == "") {
                delete generatorOption[key];
            }
        }
        const params = new URLSearchParams(Object(generatorOption));
        router.push("?" + params.toString(), undefined, { shallow: true });
        if (typeof window != "undefined") {
            window.localStorage.setItem(
                "generator_option",
                JSON.stringify(generatorOption)
            );
        }
    };

    const handleCopy = () => {
        new ClipboardJS(".icon-copy", {
            text: String(() => {
                setIconActions({
                    ...iconActions,
                    clipboard: {
                        text: "Copied!",
                        icon: "clipboard-check.svg",
                    },
                });
                setTimeout(() => {
                    setIconActions({
                        ...iconActions,
                        clipboard: {
                            text: "Copy to clipboard",
                            icon: "clipboard.svg",
                        },
                    });
                }, 5000);
                return password;
            }),
        });
    };

    const handleDownload = (): void => {
        var data = new Blob(
            [
                "// ==PasswordGenerator==\n",
                "// Strong random password generator\n",
                "// @webiste https://strongpasswordgenerator.com\n",
                "// @params https://strongpasswordgenerator.com" +
                    router.asPath +
                    "\n",
                "// @date " + new Date() + "\n",
                "// ==PasswordGenerator==\n\n",
                password,
            ],
            {
                type: "text/plain;charset=utf-8",
            }
        );
        const d = new Date();
        let year: string = String(d.getFullYear());
        let month: string = String(
            d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
        );
        let day: string = String(
            d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
        );
        FileSaver.saveAs(
            data,
            "password-" + year + "-" + month + "-" + day + ".txt"
        );
        setIconActions({
            ...iconActions,
            download: "file-earmark-check.svg",
        });
        setTimeout(() => {
            setIconActions({
                ...iconActions,
                download: "file-earmark-arrow-down.svg",
            });
        }, 5000);
    };

    useEffect(() => {
        const localOption = JSON.parse(
            window.localStorage.getItem("generator_option")
        );

        if (localOption) {
            setGeneratorOption(localOption);
        }
        // const ga4react = new GA4React("G-SZM2QWC7T5");
        // ga4react.initialize().then(
        //     (ga4) =>
        //         ga4.pageview(window.location.pathname + window.location.search),
        //     (err) => console.error(err)
        // );
    }, []);

    return (
        <>
            <PageHead {...pageConfig["home"]} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="mb-5 text-light text-center">
                            <h1>Strong Random Passwords Generator</h1>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row mb-3">
                                <label className="col-sm-5 text-white col-form-label">
                                    Password Length
                                </label>
                                <div className="col-sm-2">
                                    <input
                                        type="number"
                                        className="form-control border-0"
                                        name="length"
                                        min={6}
                                        max={256}
                                        defaultValue={6}
                                        value={generatorOption.length}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            {[
                                {
                                    label: "Include Symbols",
                                    eg: "(e.g. !@#$%^&*()+_-=...)",
                                    name: "symbols",
                                    checked: generatorOption.symbols,
                                },
                                {
                                    label: "Include Numbers",
                                    eg: "(e.g. 123456...)",
                                    name: "numbers",
                                    checked: generatorOption.numbers,
                                },
                                {
                                    label: "Include Lowercase Characters",
                                    eg: "(e.g. abcdefgh...)",
                                    name: "lowercase",
                                    checked: generatorOption.lowercase,
                                },
                                {
                                    label: "Include Uppercase Characters",
                                    eg: "(e.g. ABCDEFGH...)",
                                    name: "uppercase",
                                    checked: generatorOption.uppercase,
                                },
                                {
                                    label: "Exclude Similar Characters",
                                    eg: " (e.g. i, l, 1, L, o, 0, O...)",
                                    name: "excludeSimilarCharacters",
                                    checked:
                                        generatorOption.excludeSimilarCharacters,
                                },
                            ].map((item, key) => {
                                return (
                                    <div className="row mb-3" key={key}>
                                        <label className="col-sm-5 text-white col-form-label">
                                            {item.label}
                                        </label>
                                        <div className="col-sm-7">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input border-0"
                                                    type="checkbox"
                                                    value=""
                                                    name={item.name}
                                                    checked={item.checked}
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                />

                                                <label className="form-check-label text-white">
                                                    <em>{item.eg}</em>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="row mb-3">
                                <label className="col-sm-5 text-white col-form-label">
                                    Exclude
                                </label>
                                <div className="col-sm-7">
                                    <input
                                        className="form-control border-0"
                                        type="text"
                                        value={generatorOption.exclude}
                                        onChange={(e) => handleChange(e)}
                                        name="exclude"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label className="col-sm-5 text-white col-form-label">
                                    Password Blur
                                </label>
                                <div className="col-sm-7">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input border-0"
                                            type="checkbox"
                                            checked={generatorOption.blur}
                                            onChange={(e) => handleChange(e)}
                                            name="blur"
                                        />
                                        <label className="form-check-label text-white">
                                            <em>
                                                (e.g. &nbsp;
                                                <span
                                                    style={{
                                                        filter: "blur(0.11rem)",
                                                    }}
                                                >
                                                    StrongPasswordGenerator
                                                </span>
                                                )
                                            </em>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {password ? (
                                <div className="text-center text-light mt-4">
                                    <div
                                        className="badge px-4 py-3 text-wrap text-break"
                                        style={{
                                            backgroundColor: "#65419a",
                                            fontSize: "1.2em",
                                        }}
                                    >
                                        <div
                                            style={{
                                                filter: generatorOption.blur
                                                    ? "blur(0.15rem)"
                                                    : "",
                                            }}
                                        >
                                            {password}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-inline px-2">
                                            <Image
                                                className="icon-copy"
                                                role="button"
                                                onClick={handleCopy}
                                                src={
                                                    "/" +
                                                    iconActions.clipboard.icon
                                                }
                                                width={22}
                                                height={22}
                                            />
                                        </div>
                                        <div className="d-inline px-2">
                                            <Image
                                                role="button"
                                                onClick={handleDownload}
                                                src={"/" + iconActions.download}
                                                width={22}
                                                height={22}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    className="btn btn-outline-light fw-bold px-3 py-2"
                                    onClick={handleGenerator}
                                >
                                    Generator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default GeneratorPage;
