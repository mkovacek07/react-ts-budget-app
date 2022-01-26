import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";
import ViewExpense from "./ViewExpense";
import { useBudgets } from "../contexts/BudgetContext";

interface Budget {
  budgetId?: string;
  name: string;
  amount: number;
  maxAmount: number;
  onAddExpenseClick?: any;
  gray?: boolean;
  hideBtn?: boolean;
  hideDeleteBtn?: boolean;
}

export default function BudgetCard(prop: Budget) {
  const { deleteBudget } = useBudgets();

  let classNames: string[] = [];
  if (prop.amount > prop.maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (prop.gray) {
    classNames.push("bg-light");
  }
  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mg-3">
          <div className="d-inline-flex align-items-baseline">
            <div className="me-2">{prop.name}</div>
            {!prop.hideDeleteBtn && (
              <Button
                variant="outline-danger"
                onClick={() => deleteBudget(prop.budgetId)}
              >
                Delete
              </Button>
            )}
          </div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(prop.amount)}
            {prop.maxAmount && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(prop.maxAmount)}
              </span>
            )}
          </div>
        </Card.Title>
        {prop.maxAmount && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(prop.amount, prop.maxAmount)}
            min={0}
            max={prop.maxAmount}
            now={prop.amount}
          ></ProgressBar>
        )}
        <Stack direction="horizontal" gap={2} className="mt-4">
          {!prop.hideBtn && (
            <Button
              className="ms-auto"
              variant="outline-primary"
              onClick={prop.onAddExpenseClick}
            >
              Add Expense
            </Button>
          )}
          {!prop.hideBtn && (
            <ViewExpense budgetId={prop.budgetId}></ViewExpense>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount: number, maxAmount: number): string {
  const ratio: number = amount / maxAmount;

  if (ratio < 0.5) {
    return "primary";
  }
  if (ratio < 0.75) {
    return "warning";
  }

  return "danger";
}
