import React from "react";
import { Accordion, ListGroup, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

interface ViewExpanseProp {
  budgetId?: string;
}

export default function ViewExpense(prop: ViewExpanseProp) {
  const { expenses, deleteExpenses } = useBudgets();

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>View Expense</Accordion.Header>
        <Accordion.Body>
          <ListGroup as="ol" numbered>
            {expenses.map((expense: any) => {
              if (expense.budgetId === prop.budgetId) {
                return (
                  <ListGroup.Item
                    key={expense.id}
                    as="li"
                    className="d-flex justify-content-between align-items-start gap-2"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{expense.name}</div>
                      {expense.description}
                    </div>
                    <Button
                      onClick={() => deleteExpenses(expense.id)}
                      size="sm"
                      variant="outline-danger"
                    >
                      &times;
                    </Button>
                  </ListGroup.Item>
                );
              }
            })}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
