import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

jest.mock("@clerk/nextjs", () => ({
  SignedIn: ({ children }) => <div>{children}</div>,
  SignedOut: ({ children }) => <div>{children}</div>,
  SignInButton: ({ children }) => <div>{children}</div>,
}));

describe("HomePage", () => {
  it("prikaze naslov aplikacije", () => {
    render(<HomePage />);
    expect(screen.getByText("FinanceApp")).toBeInTheDocument();
  });
});
