import Link from "next/link";
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
const Header = () => {
    const router: NextRouter = useRouter();
    useEffect(() => {
        console.log("0000000000000");
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
                                <Link href="/password-validator">
                                    <a className="nav-link">
                                        Password Validator
                                    </a>
                                </Link>
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
                                    {["md5", "sha-1", "sha-256", "sha-512"].map(
                                        (hash, i) => {
                                            return (
                                                <>
                                                    <li className="py-1">
                                                        <Link
                                                            href={`${hash.replace(
                                                                "-",
                                                                ""
                                                            )}-hash-generator`}
                                                        >
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                            >
                                                                {`${hash.toUpperCase()} Hash Generator`}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </>
                                            );
                                        }
                                    )}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href="/bcrypt-generator">
                                    <a className="nav-link">Bcrypt Generator</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
