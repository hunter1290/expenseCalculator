import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
    max-width: 600px;
    max-height: 55vh;
    
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

const List = styled.ul`
     max-height: 20vh;
     overflow-y: scroll;
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    background: #f8f9fa;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Amount = styled.span`
    font-weight: bold;
    color: #28a745;
`;

function ExpenseList() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetchExpenses();
    }, [category, date]);

    const fetchExpenses = async () => {
        try {
            const token = localStorage.getItem("token"); // Get JWT from localStorage
            let url = `${process.env.REACT_APP_BASEURL}/api/expenses`;

            const params = {};
            if (category) params.category = category;
            if (date) params.date = date;

            const res = await axios.get(url, {
                params,
                headers: { Authorization: `Bearer ${token}` }, // Send JWT in headers
            });

            setExpenses(res.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            alert("Failed to load expenses. Please try again.");
        }
    };

    return (
        <Container>
            <h2>Expense List</h2>
            <div>
                <Input type="text" placeholder="Filter by category" onChange={(e) => setCategory(e.target.value)} />
                <Input type="date" onChange={(e) => setDate(e.target.value)} />
            </div>
            <List>
                {expenses.length > 0 ? (
                    expenses.map((exp) => (
                        <ListItem key={exp._id}>
                            <span>{exp.category} - {new Date(exp.date).toLocaleDateString()}</span>
                            <Amount>₹{exp.amount}</Amount>
                        </ListItem>
                    ))
                ) : (
                    <p style={{textAlign:"center"}}>No expenses found</p>
                )}
            </List>
        </Container>
    );
}

export default ExpenseList;
