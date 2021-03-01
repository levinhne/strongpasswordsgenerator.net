import React from "react";
import { Container, Row } from "react-bootstrap-v5";

const Footer: React.FC = () => {
    return (
        <footer className="">
            <div className="border-top py-5 bg-light">
                <Container>
                    <Row>
                        <div className="col-md-6 offset-md-3">
                            <p>
                                <strong>To ensure security for your passwords and online accounts, please note that</strong>
                            </p>
                            <p>1. Do not use the same or similar passwords, security questions, and answers for multiple important accounts.</p>
                            <p>2. Use a password of at least 16 characters, use at least one special symbol, one number, one lowercase character, and one corresponding uppercase character.</p>
                            <p>3. Do not use family names or friends' names in your password.</p>
                            <p>4. Do not use your date of birth, postal code, home number, and phone number to set your password.</p>
                            <p>5. Do not use any words in the dictionary to set your password.</p>
                            <p>6. Do not use anything copyable (that you cannot change) as passwords, such as fingerprints.</p>
                            <p>7. Do not let your Web browsers (Firefox, Chrome, Safari, Opera, IE) save your passwords.</p>
                            <p>8. Do not log in to important accounts on someone else's computer, or when the machine is connected to a public Wi-Fi hotspot, Tor, free VPN, or web proxy.</p>
                            <p>9. Send sensitive/important information online over encrypted connections like HTTPS and SFTP.</p>
                            <p>10. Install firewall software and virus software to protect your computer.</p>
                        </div>
                    </Row>
                </Container>
            </div>
            <div className="border-top bg-light">
                <div className="text-secondary text-center pt-1 pb-2">
                    Made with <span style={{ color: "#e25555", fontSize: "1.2em" }}>&#9829;</span> in Switzerland
                </div>
            </div>
        </footer>
    );
};

export default Footer;
