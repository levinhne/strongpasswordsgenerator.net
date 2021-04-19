import { useRouter, NextRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

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
                    <Link href="/">
                        <a className="navbar-brand fw-bold">
                            Strong Passwords Generator
                        </a>
                    </Link>
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
                            <li className="nav-item ">
                                <Link href="/password-validator">
                                    <a
                                        className={
                                            router.asPath ==
                                            "/password-validator"
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                    >
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
                                                        <Link
                                                            href={`/${hash.replace(
                                                                "-",
                                                                ""
                                                            )}-hash-generator`}
                                                        >
                                                            <a
                                                                className={
                                                                    router.asPath ==
                                                                    `/${hash.replace(
                                                                        "-",
                                                                        ""
                                                                    )}-hash-generator`
                                                                        ? "dropdown-item active"
                                                                        : "dropdown-item"
                                                                }
                                                            >
                                                                {`${hash.toUpperCase()} Hash Generator`}
                                                            </a>
                                                        </Link>
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
                                <Link href="/bcrypt-generator">
                                    <a
                                        className={
                                            router.asPath == "/bcrypt-generator"
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                    >
                                        Bcrypt Generator
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/wordpress-generator">
                                    <a
                                        className={
                                            router.asPath ==
                                            "/wordpress-generator"
                                                ? "nav-link active"
                                                : "nav-link"
                                        }
                                        href="/wordpress-generator"
                                    >
                                        Wordpress Generator
                                    </a>
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
