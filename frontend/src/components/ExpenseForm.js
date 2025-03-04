import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.div`
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
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

function ExpenseForm({ onAdd }) {
    const [expense, setExpense] = useState({
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // Get JWT token

        try {
            const res = await axios.post(`${process.env.REACT_APP_BASEURL}/api/expenses`, expense, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Send JWT for authentication
                },
            });

            onAdd(res.data); // Update UI with new expense
            setExpense({ amount: "", category: "", date: "", description: "" }); // Reset form fields
        } catch (error) {
            console.error("Error adding expense", error);
            alert("Failed to add expense. Please try again.");
        }
    };

    return (
        <FormContainer>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name="amount"
                    type="number"
                    value={expense.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                    required
                />
                <Input
                    name="category"
                    type="text"
                    value={expense.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
                <Input
                    name="date"
                    type="date"
                    value={expense.date}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="description"
                    type="text"
                    value={expense.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <Button type="submit">Add Expense</Button>
            </form>
        </FormContainer>
    );
}

export default ExpenseForm;
