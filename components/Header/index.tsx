import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap-v5";
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
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand
                        href="/"
                        title="Strong Passwords Generator"
                        className="fw-bolder"
                    >
                        Strong Passwords Generator
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {pages.map((page, i) => {
                                let className = "nav-link";
                                if (router.pathname.indexOf(page.url) > -1) {
                                    className += " active";
                                }
                                return (
                                    <Nav.Item key={i}>
                                        <Nav.Link
                                            href={page.url}
                                            className={className}
                                        >
                                            {page.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                            <NavDropdown
                                title="Hash Generator"
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="/md5-hash-generator">
                                    MD5 Generator
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/sha1-hash-generator">
                                    SHA-1 Generator
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/sha256-hash-generator">
                                    SHA-256 Generator
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/sha512-hash-generator">
                                    SHA-512 Generator
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
