import { useEffect, useState } from "react";
import passwordValidator from "password-validator";
import { GenerateOptions } from "generate-password";
import { useRouter } from "next/router";
import PageHead from "../components/PageHead";
import { pageConfig } from "../constants/page";
import GA4React from "ga-4-react";

interface ValidatorOptions extends GenerateOptions {
    password?: string;
}

const getValidResultMessage = (results: string[]): string => {
    let message: string = "";
    if (results.length == 0) {
        message = "Password is valid.";
    } else {
        const index = results.indexOf("min");
        if (index !== -1) {
            results[index] = "length";
        }
        message = results.join(", ");
        message =
            message.charAt(0).toUpperCase() +
            message.slice(1) +
            " is not valid.";
    }
    return message;
};

const ValidatorPage: React.FC = () => {
    const [validatorOption, setValidatorOption] = useState<ValidatorOptions>({
        password: "",
        length: 6,
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
    });

    const [validatorResult, setValidatorResult] = useState<string[]>([]);

    const handleChange = (e: any) => {
        switch (e.target.type) {
            case "checkbox":
                setValidatorOption({
                    ...validatorOption,
                    [e.target.name]: e.target.checked ? true : false,
                });
                break;
            default:
                setValidatorOption({
                    ...validatorOption,
                    [e.target.name]: e.target.value,
                });
                break;
        }
    };

    const handleValidator = (): void => {
        const validator = new passwordValidator();
        let schema = validator.is().min(validatorOption.length);
        if (validatorOption.symbols == true) {
            schema = schema.is().symbols();
        }
        if (validatorOption.numbers == true) {
            schema = schema.is().digits();
        }
        if (validatorOption.uppercase == true) {
            schema = schema.is().uppercase();
        }
        if (validatorOption.lowercase == true) {
            schema = schema.is().lowercase();
        }
        // schema = schema.has().not().spaces();
        const results: string[] = schema.validate(validatorOption.password, {
            list: true,
        });
        setValidatorResult(results);
    };

    useEffect(() => {
        // const ga4react = new GA4React("G-SZM2QWC7T5");
        // ga4react.initialize().then(
        //     (ga4) =>
        //         ga4.pageview(window.location.pathname + window.location.search),
        //     (err) => console.error(err)
        // );
    }, [validatorResult]);

    return (
        <>
            <PageHead {...pageConfig["password_validator"]} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="mb-3 text-light text-center">
                            <h1>Strong Password Validator</h1>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <div className="row mb-4">
                                <input
                                    className="form-control form-control-lg border-0"
                                    type="text"
                                    value={validatorOption.password}
                                    placeholder=""
                                    name="password"
                                    onChange={(e) => handleChange(e)}
                                />
                                <div
                                    className={
                                        validatorResult.length == 0
                                            ? "form-text text-success fst-italic mb-2"
                                            : "form-text text-danger fst-italic mb-2"
                                    }
                                    style={{ marginLeft: "-10px" }}
                                >
                                    {getValidResultMessage(validatorResult)}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-6 text-white col-form-label text-white">
                                    Password Length
                                </label>
                                <div className="col-auto">
                                    <input
                                        type="number"
                                        className="form-control border-0"
                                        name="length"
                                        min={6}
                                        max={256}
                                        defaultValue={6}
                                        value={validatorOption.length}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            {[
                                {
                                    label: "Include Symbols",
                                    eg: "(e.g. !@#$%^&*()+_-=...)",
                                    name: "symbols",
                                    checked: validatorOption.symbols,
                                },
                                {
                                    label: "Include Numbers",
                                    eg: "(e.g. 123456...)",
                                    name: "numbers",
                                    checked: validatorOption.numbers,
                                },
                                {
                                    label: "Include Lowercase Characters",
                                    eg: "(e.g. abcdefgh...)",
                                    name: "lowercase",
                                    checked: validatorOption.lowercase,
                                },
                                {
                                    label: "Include Uppercase Characters",
                                    eg: "(e.g. ABCDEFGH...)",
                                    name: "uppercase",
                                    checked: validatorOption.uppercase,
                                },
                            ].map((item, key) => {
                                return (
                                    <div className="row mb-3" key={key}>
                                        <label className="col-sm-6 text-white col-form-label text-white">
                                            {item.label}
                                        </label>
                                        <div className="col-sm-6">
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
                            <div className="mt-4 text-center">
                                <button
                                    type="button"
                                    className="btn btn-lg btn-outline-light fw-bold px-3 py-2"
                                    onClick={
                                        validatorOption.password != ""
                                            ? handleValidator
                                            : null
                                    }
                                >
                                    Validator
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ValidatorPage;
