import { Row } from "react-bootstrap-v5";

export type Options = {
    length?: number;
    symbols?: boolean;
    numbers?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    excludeSimilarCharacters?: boolean;
    exclude?: string;
    blur?: boolean;
};

export type FormOptionProps = {
    handleChange: (e: any) => void;
    isBlur?: boolean;
    options: Options;
};

const FormOption: React.FC<FormOptionProps> = ({
    options,
    isBlur,
    handleChange,
}) => {
    return (
        <div className="">
            <Row className="mb-3">
                <label className="col-sm-6 text-white col-form-label">
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
                        value={options.length}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </Row>
            {[
                {
                    label: "Include Symbols",
                    eg: "(e.g. !@#$%^&*()+_-=...)",
                    name: "symbols",
                    checked: options.symbols,
                },
                {
                    label: "Include Numbers",
                    eg: "(e.g. 123456...)",
                    name: "numbers",
                    checked: options.numbers,
                },
                {
                    label: "Include Lowercase Characters",
                    eg: "(e.g. abcdefgh...)",
                    name: "lowercase",
                    checked: options.lowercase,
                },
                {
                    label: "Include Uppercase Characters",
                    eg: "(e.g. ABCDEFGH...)",
                    name: "uppercase",
                    checked: options.uppercase,
                },
                {
                    label: "Exclude Similar Characters",
                    eg: " (e.g. i, l, 1, L, o, 0, O...)",
                    name: "excludeSimilarCharacters",
                    checked: options.excludeSimilarCharacters,
                },
            ].map((item, key) => {
                return (
                    <Row className="mb-3" key={key}>
                        <label className="col-sm-6 text-white col-form-label">
                            {item.label}
                        </label>
                        <div className="col-sm-6">
                            <div className="form-check">
                                <input
                                    className="form-check-input border-0"
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => handleChange(e)}
                                    name={item.name}
                                />
                                <label className="form-check-label text-white">
                                    <em>{item.eg}</em>
                                </label>
                            </div>
                        </div>
                    </Row>
                );
            })}
            <Row className="mb-3">
                <label className="col-sm-6 text-white col-form-label">
                    Exclude
                </label>
                <div className="col-sm-6">
                    <input
                        className="form-control border-0"
                        type="text"
                        value={options.exclude}
                        onChange={(e) => handleChange(e)}
                        name="exclude"
                        placeholder=""
                    />
                </div>
            </Row>
            {/* <Row className="mb-3">
                <label className="col-sm-6 text-white col-form-label">
                    Strict
                </label>
                <div className="col-sm-6">
                    <div className="form-check">
                        <input
                            className="form-check-input border-0"
                            type="checkbox"
                            checked={true}
                            onChange={(e) => handleChange(e)}
                            value=""
                        />
                    </div>
                </div>
            </Row> */}
            {isBlur ? (
                <Row>
                    <label className="col-sm-6 text-white col-form-label">
                        Password Blur
                    </label>
                    <div className="col-sm-6">
                        <div className="form-check">
                            <input
                                className="form-check-input border-0"
                                type="checkbox"
                                checked={options.blur}
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
                </Row>
            ) : (
                ""
            )}
        </div>
    );
};

export default FormOption;
