import { render, screen, waitFor, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "../components/signup.component";

test("1. Test that signup component renders", () => {
  render(<Signup />);

  const firstName = screen.getByPlaceholderText("First name");
  expect(firstName).toBeInTheDocument();

  const lastName = screen.getByPlaceholderText("Last name");
  expect(lastName).toBeInTheDocument();

  const email = screen.getByPlaceholderText("Enter email");
  expect(email).toBeInTheDocument();

  const password = screen.getByPlaceholderText("Enter password");
  expect(password).toBeInTheDocument();

  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
});

test("2.1. Test that first name is updated", () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("First name");

  userEvent.type(inputComponent, "Sean");

  expect(inputComponent).toHaveValue("Sean");
});

test("2.2. Test that last name is updated", () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Last name");

  userEvent.type(inputComponent, "Kim");

  expect(inputComponent).toHaveValue("Kim");
});

test("2.3. Test that email is updated", () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Enter email");

  userEvent.type(inputComponent, "seank4@uic.edu");

  expect(inputComponent).toHaveValue("seank4@uic.edu");
});

test("2.4. Test that password is updated", () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Enter password");

  userEvent.type(inputComponent, "!123456");

  expect(inputComponent).toHaveValue("!123456");
});

test("3.1. Test Valid Password", () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Enter password");

  userEvent.type(inputComponent, "!123456");

  expect(inputComponent).toHaveValue("!123456");

  const errorText = screen.queryByText("Password is weak!");
  expect(errorText).not.toBeInTheDocument();
});

test("3.2. Test A Bad Password fails condition 1", async () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Enter password");
  const submitButton = screen.getByRole("button");

  userEvent.type(inputComponent, "123456");
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Password is weak!')).toBeInTheDocument;
  });
});

test("3.3. Test A Bad Password fails condition 2", async () => {
  render(<Signup />);

  const inputComponent = screen.getByPlaceholderText("Enter password");
  const submitButton = screen.getByRole("button");

  userEvent.type(inputComponent, "!123");
  await userEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText('Password is weak!')).toBeInTheDocument;
  });
});
