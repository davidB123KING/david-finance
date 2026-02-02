import { render, screen } from '@testing-library/react';
import SignInPage from '../pages/signin';

// Ker je SignIn iz Clerk, samo preverimo render
jest.mock('@clerk/nextjs', () => ({
  SignIn: () => <div data-testid="clerk-signin">SignIn komponenta</div>,
  SignUp: () => <div data-testid="clerk-signup">SignUp komponenta</div>,
}));

describe('SignInPage', () => {
  it('rendera SignIn komponento', () => {
    render(<SignInPage />);
    expect(screen.getByTestId('clerk-signin')).toBeInTheDocument();
  });
});
