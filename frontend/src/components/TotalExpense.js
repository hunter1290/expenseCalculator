import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: calc(50% - 5px);
    padding: 10px;
    margin: 10px 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
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
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background: #0056b3;
    }
`;

const TotalAmount = styled.h3`
    text-align: center;
    color: #28a745;
`;

function TotalExpense() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [total, setTotal] = useState(null);

    const fetchTotal = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve JWT token
            const res = await axios.get(`${process.env.REACT_APP_BASEURL}/api/expenses/total`, {
                params: { start, end },
                headers: { Authorization: `Bearer ${token}` }, // Pass token for authentication
            });

            setTotal(res.data.total);
        } catch (error) {
            console.error("Error fetching total expenses:", error);
            alert("Failed to load total expenses. Please try again.");
        }
    };

    return (
        <Container>
            <h2>Total Expenses</h2>
            <Input type="date" onChange={(e) => setStart(e.target.value)} />
            <Input type="date" onChange={(e) => setEnd(e.target.value)} />
            <Button onClick={fetchTotal}>Get Total</Button>
            {total !== null && <TotalAmount>Total: ${total}</TotalAmount>}
        </Container>
    );
}

export default TotalExpense;
