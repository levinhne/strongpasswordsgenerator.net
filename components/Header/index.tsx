import { useRouter, NextRouter } from "next/router";
import { useEffect } from "react";

const pages = [
    {
        url: "/password-validator",
        name: "Password Validator",
    },
    {
        url: "/bcrypt-generator",
        name: "Bcrypt Generator",
    },
];
const Header: React.FC = () => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        import("bootstrap").then(({ Collapse }) => {
            [].slice
                .call(document.querySelectorAll(".collapse"))
                .map(function (item) {
                    return new Collapse(item, {
                        toggle: false,
                    });
                });
        });
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="/">
                        Strong Passwords Generator
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="/password-validator"
                                >
                                    Password Validator
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Hash Generator
                                </a>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <h5 className="dropdown-header">
                                            HASH GENERATOR
                                        </h5>
                                    </li>
                                    {["md5", "sha-1", "sha-256", "sha-512"].map(
                                        (hash, i) => {
                                            return (
                                                <>
                                                    <li
                                                        key={i}
                                                        className="py-1"
                                                    >
                                                        <a
                                                            className="dropdown-item"
                                                            href={`/${hash.replace(
                                                                "-",
                                                                ""
                                                            )}-hash-generator`}
                                                        >
                                                            {`${hash.toUpperCase()} Hash Generator`}
                                                        </a>
                                                    </li>
                                                </>
                                            );
                                        }
                                    )}
                                    {/* <li>
                                        <h5 className="dropdown-header">
                                            HMAC GENERATOR
                                        </h5>
                                    </li> */}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="/bcrypt-generator"
                                >
                                    Bcrypt Generator
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="/wordpress-generator"
                                >
                                    Wordpress Generator
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
