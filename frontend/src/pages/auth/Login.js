import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f4f4f4;
`;

const LoginForm = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    margin-bottom: 1.5rem;
    color: #333;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #0056b3;
    }
`;

const ErrorMsg = styled.p`
    color: red;
    font-size: 0.9rem;
`;

const SignupText = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #333;
`;

const SignupLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
        text-decoration: underline;
    }
`;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASEURL}/api/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed", error);
            setError("Invalid email or password!");
        }
    };

    return (
        <Container>
            <LoginForm onSubmit={handleLogin}>
                <Title>Login</Title>
                {error && <ErrorMsg>{error}</ErrorMsg>}
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Button type="submit">Login</Button>
                <SignupText>
                    Don't have an account? <SignupLink to="/signup">Sign Up</SignupLink>
                </SignupText>
            </LoginForm>
        </Container>
    );
};

export default Login;
