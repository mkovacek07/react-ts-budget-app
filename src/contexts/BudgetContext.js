import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import useLocalStorage from "../localeStorage";

const BudgetContext = React.createContext();
export function useBudgets() {
  return useContext(BudgetContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((x) => x.budgetId === budgetId);
  }

  function addExpenses({ name, description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuid(), name, description, amount, budgetId },
      ];
    });
  }

  function deleteExpenses(expenseId) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((x) => x.id !== expenseId);
    });
  }

  function addBudget({ name, maxAmount }) {
    // if (prevBudgets.find((x) => x.name === name)) {
    //   return prevBudgets;
    // }
    setBudgets((prevBudgets) => {
      return [...prevBudgets, { id: uuid(), name, maxAmount }];
    });
  }

  function deleteBudget(budgetId) {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((x) => x.id !== budgetId);
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
