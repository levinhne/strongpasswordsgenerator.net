import React, { useState, useRef, useEffect } from "react";
import { Button, Container, Dropdown } from "react-bootstrap-v5";
import bcrypt from "bcryptjs";

interface RouteQuery {
    hash?: string;
}

const getRounds = () => {
    const rounds = [];
    for (let i = 1; i <= 18; i++) {
        rounds.push(<option value={i} selected>{`Rounds ${i}`}</option>);
    }
    return rounds;
};

const BcryptGeneratorPage: React.FC = () => {
    const inputHashRef = useRef<HTMLInputElement>(null);
    const [round, setRound] = useState<number>(12);
    const [hashResult, setHashResult] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRound(Number(e.target.value));
    };

    const handleGenerator = (): void => {
        const value = String(inputHashRef.current?.value);
        if (!value) {
            return;
        }
        var salt = bcrypt.genSaltSync(round);
        var hash = bcrypt.hashSync(value, salt);
        setHashResult(hash);
    };

    return (
        <section
            className="py-5"
            style={{ background: "linear-gradient(#614092, #7952b3)" }}
        >
            <Container>
                <div className="row justify-content-md-center">
                    <div className="col-lg-6 mb-4">
                        <div className="text-light text-center mb-4">
                            <h1>Bcrypt Hash Generator</h1>
                        </div>
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control form-control-lg border-0 mb-2"
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
                                    {getRounds()}
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
                            <Button
                                type="submit"
                                className="btn btn-lg btn-outline-light fw-bold px-3 py-2"
                                onClick={handleGenerator}
                            >
                                Generator
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default BcryptGeneratorPage;
