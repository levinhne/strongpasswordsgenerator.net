import { useEffect, useState } from "react";
import ClipboardJS from "clipboard";
import Image from "next/image";
import generator from "generate-password";
import FileSaver from "file-saver";
import { useRouter } from "next/router";
import { Button, Container, Row, Tooltip, OverlayTrigger } from "react-bootstrap-v5";
import GA4React from "ga-4-react";

interface GenerateOptions {
    length: number;
    symbols: boolean;
    numbers: boolean;
    uppercase: boolean;
    lowercase: boolean;
    excludeSimilarCharacters: boolean;
    exclude: string;
    blur: boolean;
}

const HomePage: React.FC = () => {
    const router = useRouter();
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
        length: 6,
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
        exclude: "",
        blur: true,
    });
    const onChange = (e: any) => {
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
        const params = new URLSearchParams(Object(generatorOption));
        router.push("?" + params.toString(), undefined, { shallow: true });
        if (typeof window != "undefined") {
            window.localStorage.setItem("generator_option", JSON.stringify(generatorOption));
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
        var data = new Blob(["// ==PasswordGenerator==\n", "// Strong random password generator\n", "// @webiste https://strongpasswordgenerator.com\n", "// @params https://strongpasswordgenerator.com" + router.asPath + "\n", "// @date " + new Date() + "\n", "// ==PasswordGenerator==\n\n", password], {
            type: "text/plain;charset=utf-8",
        });
        const d = new Date();
        let year: string = String(d.getFullYear());
        let month: string = String(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
        let day: string = String(d.getDate() < 10 ? "0" + d.getDate() : d.getDate());
        FileSaver.saveAs(data, "password-" + year + "-" + month + "-" + day + ".txt");
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
        const localOption = JSON.parse(window.localStorage.getItem("generator_option"));
        if (localOption) {
            setGeneratorOption(JSON.parse(window.localStorage.getItem("generator_option")));
        }
        const ga4react = new GA4React("G-SZM2QWC7T5");
        ga4react.initialize().then(
            (ga4) => ga4.pageview(window.location.pathname + window.location.search),
            (err) => console.error(err)
        );
    }, []);

    return (
        <section className="py-5" style={{ background: "linear-gradient(#614092, #7952b3)" }}>
            <Container>
                <div className="row justify-content-md-center">
                    <div className="mb-4 text-light text-center">
                        <h1>Strong Random Password Generator</h1>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Password Length</label>
                            <div className="col-sm-2">
                                <input type="number" className="form-control border-0" name="length" min={6} max={256} defaultValue={6} value={generatorOption.length} onChange={(e) => onChange(e)} />
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Include Symbols</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.symbols} onChange={(e) => onChange(e)} name="symbols" />
                                    <label className="form-check-label text-white">
                                        <em>(e.g. !@#$%^&*()+_-=...)</em>
                                    </label>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Include Numbers</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.numbers} onChange={(e) => onChange(e)} name="numbers" />
                                    <label className="form-check-label text-white">
                                        <em>(e.g. 123456...)</em>
                                    </label>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Include Lowercase Characters</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.lowercase} onChange={(e) => onChange(e)} name="lowercase" />
                                    <label className="form-check-label text-white">
                                        <em>(e.g. abcdefgh...)</em>
                                    </label>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Include Uppercase Characters</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.uppercase} onChange={(e) => onChange(e)} name="uppercase" />
                                    <label className="form-check-label text-white">
                                        <em>(e.g. ABCDEFGH...)</em>
                                    </label>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Exclude Similar Characters</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.excludeSimilarCharacters} onChange={(e) => onChange(e)} name="excludeSimilarCharacters" />
                                    <label className="form-check-label text-white">
                                        <em>(e.g. i, l, 1, L, o, 0, O...)</em>
                                    </label>
                                </div>
                            </div>
                        </Row>
                        <Row className="mb-3">
                            <label className="col-sm-6 text-white col-form-label">Exclude</label>
                            <div className="col-sm-6">
                                <input className="form-control border-0" type="text" value={generatorOption.exclude} onChange={(e) => onChange(e)} name="exclude" />
                            </div>
                        </Row>
                        <Row>
                            <label className="col-sm-6 text-white col-form-label">Password Blur</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={generatorOption.blur} onChange={(e) => onChange(e)} name="blur" />
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
                        </Row>
                        {/* <div className="mb-5 row">
                            <label className="col-sm-6 text-white col-form-label">Strict</label>
                            <div className="col-sm-6">
                                <div className="form-check">
                                    <input className="form-check-input border-0" type="checkbox" checked={true} onChange={(e) => onChange(e)} value="" />
                                </div>
               generatorOption.               </div         </div>
                        </div> */}
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
                                            filter: generatorOption.blur ? "blur(0.15rem)" : "",
                                        }}
                                    >
                                        {password}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-copy">{iconActions.clipboard.text}</Tooltip>}>
                                        <Image className="icon-copy" role="button" onClick={handleCopy} src={"/" + iconActions.clipboard.icon} width={20} height={20} />
                                    </OverlayTrigger>
                                    <span className="px-4">
                                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-qrcode">Scan Qrcode</Tooltip>}>
                                            <Image role="button" src={"/" + iconActions.scan} width={20} height={20} />
                                        </OverlayTrigger>
                                    </span>

                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-download">Download</Tooltip>}>
                                        <Image role="button" onClick={handleDownload} src={"/" + iconActions.download} width={20} height={20} />
                                    </OverlayTrigger>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="mt-4 text-center">
                            <Button type="submit" className="btn btn-outline-light fw-bold px-3 py-2" onClick={handleGenerator}>
                                Generator
                            </Button>
                        </div>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default HomePage;
