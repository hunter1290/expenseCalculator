import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./pages/ExpenseTracker";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import GlobalStyle from "./components/GlobalStyle";
import ProtectedRoute from "./components/ProtectedRoute";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f4f4f4;
`;

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Container>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    
                    {/* Protected Route for Dashboard */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<ExpenseTracker />} />
                    </Route>
                </Routes>
            </Container>
        </Router>
    );
}

export default App;