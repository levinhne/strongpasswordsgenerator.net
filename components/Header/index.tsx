import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap-v5";
const pages = [
    {
        url: "/generator",
        name: "Password Generator",
    },
    {
        url: "/validator",
        name: "Password Validator",
    },
    {
        url: "/hash",
        name: "Hash Generator",
    },
];
const Header = () => {
    const router: NextRouter = useRouter();
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/" title="Strong Passwords Generator">
                        <strong>Strong Passwords Generator</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {pages.map((page, i) => {
                                let className = "nav-link";
                                if (router.pathname.indexOf(page.url) > -1) {
                                    className += " active";
                                }
                                console.log();
                                return (
                                    <li key={i} className="nav-item">
                                        <Link href={page.url}>
                                            <a className={className}>
                                                {page.name}
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                            {/* <NavDropdown
                                title="Dropdown"
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>*/}
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
