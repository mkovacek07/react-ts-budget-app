import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contexts/BudgetContext";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount: number = expenses.reduce(
    (total: number, expense: any) => total + expense.amount,
    0
  );
  const max = budgets.reduce(
    (total: number, budget: any) => total + budget.maxAmount,
    0
  );
  if (max === 0) {
    return null;
  }
  return (
    <BudgetCard
      amount={amount}
      maxAmount={max}
      name="Total"
      hideBtn={true}
      hideDeleteBtn={true}
    ></BudgetCard>
  );
}
