import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../contexts/BudgetContext";

interface AddBudgetProps {
  show: boolean;
  handleClose: any;
}

export default function AddBudget(prop: AddBudgetProps) {
  const nameRef: any = useRef();
  const maxAmountRef: any = useRef();
  const { addBudget } = useBudgets();

  function handleSubmit(e: any): void {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      maxAmount: parseFloat(maxAmountRef.current.value),
    });
    prop.handleClose();
  }

  return (
    <Modal show={prop.show} onHide={prop.handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="maxAmount">
            <Form.Label>Max Amount</Form.Label>
            <Form.Control
              ref={maxAmountRef}
              type="number"
              required
              min={0}
              step={0.01}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
