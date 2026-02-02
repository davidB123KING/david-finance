import { render, screen } from '@testing-library/react';
import SignUpPage from '../pages/signup';

jest.mock('@clerk/nextjs', () => ({
  SignIn: () => <div data-testid="clerk-signin">SignIn komponenta</div>,
  SignUp: () => <div data-testid="clerk-signup">SignUp komponenta</div>,
}));

describe('SignUpPage', () => {
  it('rendera SignUp komponento', () => {
    render(<SignUpPage />);
    expect(screen.getByTestId('clerk-signup')).toBeInTheDocument();
  });
});
