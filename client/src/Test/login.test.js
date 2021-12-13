import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/login.component";

test("1. Test that signup component renders", () => {
  render(<Login />);

  const email = screen.getByPlaceholderText("Enter email");
  expect(email).toBeInTheDocument();

  const password = screen.getByPlaceholderText("Enter password");
  expect(password).toBeInTheDocument();
});

test("2.1. Test that email is updated", () => {
  render(<Login />);

  const email = screen.getByPlaceholderText("Enter email");

  userEvent.type(email, "seank4@uic.edu");

  expect(email).toHaveValue("seank4@uic.edu");
});

test("2.2. Test that password is updated", () => {
  render(<Login />);

  const password = screen.getByPlaceholderText("Enter password");

  userEvent.type(password, "!123456");

  expect(password).toHaveValue("!123456");
});