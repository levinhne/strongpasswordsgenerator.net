import { useEffect, useState } from "react";
import passwordValidator from "password-validator";
import { useRouter } from "next/router";
import { Button, Container, Row } from "react-bootstrap-v5";

import PageHead from "../components/PageHead";
import { pageConfig } from "../constants/page";
import FormOption, { FormOptionProps, Options } from "../components/FormOption";
const ValidatorPage: React.FC = () => {
    const router = useRouter();
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

    const handleValidator = (): void => {
        const validator = new passwordValidator();
        let schema = validator
            .is()
            .min(generatorOption.length)
            .is()
            .max(generatorOption.length);
        schema = schema.has().not().spaces();
        console.log(schema.validate("AA12A ", { list: true }));
        // const params = new URLSearchParams(Object(generatorOption));
        // router.push("?" + params.toString(), undefined, { shallow: true });
        if (typeof window != "undefined") {
            window.localStorage.setItem(
                "validator_option",
                JSON.stringify(generatorOption)
            );
        }
    };

    const FormOptionProps: FormOptionProps = {
        handleChange: handleChange,
        options: generatorOption,
    };

    useEffect(() => {
        const localOption = JSON.parse(
            window.localStorage.getItem("validator_option")
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
                            <h1>Strong Password Validator</h1>
                        </div>
                        <div className="col-12 col-lg-6 mb-3">
                            <FormOption {...FormOptionProps} />
                        </div>
                    </div>
                </Container>
                <Container>
                    <Row className="justify-content-md-center">
                        <div className="col-12 col-lg-10">
                            <div className="mt-4 text-center">
                                <Button
                                    type="submit"
                                    className="btn btn-outline-light fw-bold px-3 py-2"
                                    onClick={handleValidator}
                                >
                                    Validator
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default ValidatorPage;
