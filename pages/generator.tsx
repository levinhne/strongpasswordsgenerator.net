import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import Image from "next/image";
import generator from "generate-password";
import FileSaver from "file-saver";
import { useRouter, NextRouter } from "next/router";
import {
    Button,
    Container,
    Row,
    Tooltip,
    OverlayTrigger,
} from "react-bootstrap-v5";
import GA4React from "ga-4-react";
import PageHead from "../components/PageHead";
import { pageConfig } from "../constants/page";
import FormOption, { FormOptionProps, Options } from "../components/FormOption";
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
    const [generatorOption, setGeneratorOption] = useState<Options>({
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
            text: (trigger) => {
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
            },
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

    const FormOptionProps: FormOptionProps = {
        handleChange: handleChange,
        isBlur: true,
        options: generatorOption,
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
                <Container>
                    <div className="row justify-content-md-center">
                        <div className="mb-5 text-light text-center">
                            <h1>Strong Random Passwords Generator</h1>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <FormOption {...FormOptionProps} />
                        </div>
                    </div>
                </Container>
                <Container>
                    <Row className="justify-content-md-center">
                        <div className="col-12 col-lg-10">
                            {password ? (
                                <div className="text-center text-light mt-3">
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
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip id="tooltip-copy">
                                                        {
                                                            iconActions
                                                                .clipboard.text
                                                        }
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    className="icon-copy"
                                                    role="button"
                                                    onClick={handleCopy}
                                                    src={
                                                        "/" +
                                                        iconActions.clipboard
                                                            .icon
                                                    }
                                                    width={22}
                                                    height={22}
                                                />
                                            </OverlayTrigger>
                                        </div>
                                        <div className="d-inline px-2">
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={
                                                    <Tooltip id="tooltip-download">
                                                        Download
                                                    </Tooltip>
                                                }
                                            >
                                                <Image
                                                    role="button"
                                                    onClick={handleDownload}
                                                    src={
                                                        "/" +
                                                        iconActions.download
                                                    }
                                                    width={22}
                                                    height={22}
                                                />
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="mt-4 text-center">
                                <Button
                                    type="submit"
                                    className="btn btn-outline-light fw-bold px-3 py-2"
                                    onClick={handleGenerator}
                                >
                                    Generator
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default GeneratorPage;
