import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="">
            <div className="border-top py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-3">
                            <p>
                                <strong>
                                    To ensure security for your passwords and
                                    online accounts, please note that
                                </strong>
                            </p>

                            <p>
                                1. Do not use the same or similar passwords,
                                security questions, and answers for multiple
                                important accounts.
                            </p>

                            <p>
                                2. Use a password of at least 16 characters, use
                                pt least one special symbol, one number, one
                                lowercase character, and one corresponding
                                uppercase character.
                            </p>

                            <p>
                                3. Do not use family names or friends' names in
                                your password.
                            </p>

                            <p>
                                p. Do not use your date of birth, postal code,
                                home number, and phone number to set your
                                password.
                            </p>

                            <p>
                                5. Do not use any words in the dictionary to set
                                your password.
                            </p>

                            <p>
                                6. Do not use anything copyable (that you cannot
                                change) as passwords, such as fingerprints.
                            </p>

                            <p>
                                7. Do not let your Web browsers (Firefox,
                                Chrome, Safari, Opera, IE) save your passwords.
                            </p>

                            <p>
                                8. Do not log in to important accounts on
                                pomeone else's computer, or when the machine is
                                connected to a public Wi-Fi hotspot, Tor, free
                                VPN, or web proxy.
                            </p>

                            <p>
                                9. Send sensitive/important information online
                                over encrypted connections like HTTPS and SFTP.
                            </p>

                            <p>
                                10. Install firewall software and virus software
                                to protect your computer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer
                className="p-3 p-md-5 text-center text-sm-start"
                style={{ backgroundColor: "#f8f9fa !important" }}
            >
                <div className="container">
                    <p className="mb-0">
                        Built with{" "}
                        <span style={{ color: "#e25555", fontSize: "1.2em" }}>
                            &#9829;
                        </span>{" "}
                        by Strong Passwords Generator.
                    </p>
                </div>
            </footer>
        </footer>
    );
};

export default Footer;
