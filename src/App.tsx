import { useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import { Button, Stack } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudget from "./components/AddBudget";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";
import AddExpense from "./components/AddExpense";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpenses, setShowAddExpenses] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpense(budgetId?: any) {
    setShowAddExpenses(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mb-4 gap-2">
          <h1 className="me-auto">Budget</h1>
          <Button variant="primary" onClick={() => setShowAddBudget(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={() => openAddExpense()}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat:(auto-fill, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget: any) => {
            const amount: number = getBudgetExpenses(budget.id).reduce(
              (total: number, expense: any) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                budgetId={budget.id}
                name={budget.name}
                amount={amount}
                maxAmount={budget.maxAmount}
                onAddExpenseClick={() => openAddExpense(budget.id)}
              ></BudgetCard>
            );
          })}
        </div>
        <UncategorizedBudgetCard
          onAddExpenseClick={() => openAddExpense}
        ></UncategorizedBudgetCard>
        <TotalBudgetCard></TotalBudgetCard>
      </Container>
      <AddBudget
        show={showAddBudget}
        handleClose={() => setShowAddBudget(false)}
      ></AddBudget>
      <AddExpense
        show={showAddExpenses}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => setShowAddExpenses(false)}
      ></AddExpense>
    </>
  );
}

export default App;
