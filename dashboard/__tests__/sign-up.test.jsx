import { render, screen } from "@testing-library/react";
import SignUpPage from "../app/sign-up/page";

jest.mock("@clerk/nextjs", () => ({
  SignUp: () => <div data-testid="clerk-signup">SignUp komponenta</div>,
}));

describe("SignUpPage", () => {
  it("rendera SignUp komponento", () => {
    render(<SignUpPage />);
    if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      expect(screen.getByTestId("clerk-signup")).toBeInTheDocument();
    } else {
      expect(
        screen.getByText("Clerk ni nastavljen")
      ).toBeInTheDocument();
    }
  });
});
