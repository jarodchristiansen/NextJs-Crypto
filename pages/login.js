import {Container, Row, Col} from "react-bootstrap";
import LoginForm from "../components/login/LoginForm";


const LoginPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center"}}>
            <Container fluid="md">
                <Row>
            <LoginForm/>
                    <Col>Content inside column 1</Col>

                </Row>
            </Container>
        </div>
    )
}
export default LoginPage