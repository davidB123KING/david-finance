import { render, screen } from "@testing-library/react";
import SignInPage from "../app/sign-in/page";

jest.mock("@clerk/nextjs", () => ({
  SignIn: () => <div data-testid="clerk-signin">SignIn komponenta</div>,
}));

describe("SignInPage", () => {
  it("rendera SignIn komponento", () => {
    render(<SignInPage />);
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      expect(screen.getByTestId("clerk-signin")).toBeInTheDocument();
    } else {
      expect(
        screen.getByText("Clerk ni nastavljen")
      ).toBeInTheDocument();
    }
  });
});
