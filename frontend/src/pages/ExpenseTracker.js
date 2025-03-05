import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import TotalExpense from "../components/TotalExpense";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    min-height: 100vh;
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.div`
   width: 100%;
   min-height: 50vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoutButton = styled.button`
    padding: 10px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #c82333;
    }
`;

const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FullWidthSection = styled.div`
    grid-column: span 2;
    @media (max-width: 768px) {
        grid-column: span 1;
    }
`;

function ExpenseTracker() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Container>
            <Header>
                <h1>Expense Tracker</h1>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </Header>
            <Layout>
                <ExpenseForm />
                <TotalExpense />
                <FullWidthSection>
                    <ExpenseList />
                </FullWidthSection>
            </Layout>
        </Container>
    );
}

export default ExpenseTracker;
