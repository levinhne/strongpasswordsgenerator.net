import { useEffect, useState } from "react";
import passwordValidator from "password-validator";
import { GenerateOptions } from "generate-password";
import { useRouter } from "next/router";
import { Button, Container, Row, Form } from "react-bootstrap-v5";
import PageHead from "../components/PageHead";
import { pageConfig } from "../constants/page";

interface ValidatorOptions extends GenerateOptions {
    password?: string;
}

interface ValidatorResult extends Omit<GenerateOptions, "length"> {
    length?: boolean;
}

const ValidatorPage: React.FC = () => {
    const router = useRouter();
    const [validatorOption, setValidatorOption] = useState<ValidatorOptions>({
        password: "",
        length: 6,
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
    });

    const [validatorResult, setValidatorResult] = useState<ValidatorResult>({
        length: true,
        symbols: true,
        numbers: true,
        uppercase: true,
        lowercase: true,
    });

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
        results.forEach((result) => {
            setValidatorResult({ ...validatorResult, [result]: false });
        });
    };

    useEffect(() => {
        console.log(validatorResult);
        // const ga4react = new GA4React("G-SZM2QWC7T5");
        // ga4react.initialize().then(
        //     (ga4) =>
        //         ga4.pageview(window.location.pathname + window.location.search),
        //     (err) => console.error(err)
        // );
    }, [validatorResult]);

    return (
        <>
            <PageHead {...pageConfig["home"]} />
            <section
                className="py-5"
                style={{ background: "linear-gradient(#614092, #7952b3)" }}
            >
                <Container>
                    <Row className="justify-content-md-center">
                        <div className="mb-5 text-light text-center">
                            <h1>Strong Password Validator</h1>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <Form>
                                <Row className="mb-4">
                                    <label className="col-sm-5 text-white col-form-label">
                                        Password
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            className="form-control border-0"
                                            type="text"
                                            value={validatorOption.password}
                                            placeholder=""
                                            name="password"
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <label
                                        className={
                                            validatorResult.length
                                                ? "col-sm-5 text-white col-form-label text-white"
                                                : "col-sm-5 text-white col-form-label text-white fst-italic text-decoration-line-through"
                                        }
                                    >
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
                                            value={validatorOption.length}
                                            onChange={(e) => handleChange(e)}
                                        />
                                    </div>
                                </Row>
                                {[
                                    {
                                        label: "Include Symbols",
                                        eg: "(e.g. !@#$%^&*()+_-=...)",
                                        name: "symbols",
                                        checked: validatorOption.symbols,
                                        isValid: validatorResult.symbols,
                                    },
                                    {
                                        label: "Include Numbers",
                                        eg: "(e.g. 123456...)",
                                        name: "numbers",
                                        checked: validatorOption.numbers,
                                        isValid: validatorResult.numbers,
                                    },
                                    {
                                        label: "Include Lowercase Characters",
                                        eg: "(e.g. abcdefgh...)",
                                        name: "lowercase",
                                        checked: validatorOption.lowercase,
                                        isValid: validatorResult.lowercase,
                                    },
                                    {
                                        label: "Include Uppercase Characters",
                                        eg: "(e.g. ABCDEFGH...)",
                                        name: "uppercase",
                                        checked: validatorOption.uppercase,
                                        isValid: validatorResult.uppercase,
                                    },
                                ].map((item, key) => {
                                    let className = "col-sm-5 text-white";
                                    if (!item.isValid) {
                                        className +=
                                            " fst-italic text-decoration-line-through";
                                    }
                                    return (
                                        <Row className="mb-3" key={key}>
                                            <label className={className}>
                                                {item.label}
                                            </label>
                                            <div className="col-sm-7">
                                                <Form.Check
                                                    className="border-0"
                                                    type="checkbox"
                                                    label={
                                                        <label className="form-check-label text-white">
                                                            <em>{item.eg}</em>
                                                        </label>
                                                    }
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                    name={item.name}
                                                    checked={item.checked}
                                                />
                                            </div>
                                        </Row>
                                    );
                                })}
                                <div className="mt-4 text-center">
                                    <Button
                                        type="button"
                                        className="btn btn-outline-light fw-bold px-3 py-2"
                                        onClick={
                                            validatorOption.password != ""
                                                ? handleValidator
                                                : null
                                        }
                                    >
                                        Validator
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ValidatorPage;
