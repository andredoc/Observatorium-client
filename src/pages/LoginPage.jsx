import { Container, Row, Col } from 'react-bootstrap'
import LoginForm from '../components/LoginForm/LoginForm'

function LoginPage() {

    return (
        <div className="stars">
            <div className="twinkling">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={4}>
                            <h1>Login</h1>
                            <hr />
                            <LoginForm />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default LoginPage