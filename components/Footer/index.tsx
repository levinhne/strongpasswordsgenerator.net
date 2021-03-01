import React from "react";
import { Container, Row } from "react-bootstrap-v5";

const Footer: React.FC = () => {
    return (
        <footer className="">
            <div className="border-top py-5 bg-light">
                <Container>
                    <Row>
                        <div className="col-md-8 offset-md-2">
                            <p>
                                <strong>Để giữ an toàn cho các mật khẩu và tài khoản trực tuyến của mình, bạn nên lưu ý:</strong>
                            </p>
                            <p>1. Không dùng các mật khẩu, câu hỏi bảo mật và câu trả lời giống nhau hoặc tương tự cho nhiều tài khoản quan trọng.</p>
                            <p>2. Dùng một mật khẩu có tối thiểu 16 ký tự, dùng tối thiểu một ký hiệu đặc biệt, một chữ số, một ký tự viết thường, và một ký tự viết hoa tương ứng.</p>
                            <p>3. Không dùng tên người thân trong gia đình hay tên bạn bè để đặt cho mật khẩu của bạn.</p>
                            <p>4. Không dùng ngày sinh, mã bưu chính, số nhà và số điện thoại để đặt cho mật khẩu của bạn.</p>
                            <p>5. Không dùng bất cứ từ nào có trong từ điển để đặt cho mật khẩu của bạn.</p>
                            <p>6. Không dùng thứ gì có thể sao chép (mà bạn không thể thay đổi) để làm mật khẩu, chẳng hạn như dấu vân tay.</p>
                            <p>7. Không để các trình duyệt Web của bạn ( FireFox, Chrome, Safari, Opera, IE ) lưu giữ mật khẩu của bạn.</p>
                            <p>8. Không đăng nhập vào các tài khoản quan trọng trên máy tính của người khác, hoặc khi máy đang kết nối với điểm phát sóng Wi-Fi công cộng, Tor, VPN miễn phí hay web proxy.</p>
                            <p>9. Gửi thông tin nhạy cảm trực tuyến thông qua các kết nối có mã hóa như HTTPS và SFTP.</p>
                            <p>10. Cài đặt một phần mềm tường lửa và một phần mềm dệt virus để bảo vệ máy tính của bạn.</p>
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
