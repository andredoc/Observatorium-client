import { Container, Row, Col } from "react-bootstrap"
import SignupForm from "../components/SignupForm/SignupForm"

function SignupPage() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1>SignUp</h1>
                    <hr />
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage