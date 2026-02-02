import { render, screen } from '@testing-library/react';
import DashboardPage from './dashboard';

// Mock auth
jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

// Mock DB in actions
jest.mock('@/lib/db', () => ({
  sql: jest.fn(),
}));

jest.mock('./actions', () => ({
  addTransaction: jest.fn(),
  getCategories: jest.fn(),
  createCategory: jest.fn(),
}));

// Import mockane funkcije
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';
import { getCategories } from './actions';

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('prikaže sporočilo, če ni userId', async () => {
    auth.mockResolvedValue({ userId: null });

    const { container } = render(await DashboardPage());
    expect(screen.getByText('Nisi prijavljen')).toBeInTheDocument();
  });

  it('rendera dashboard s podatki', async () => {
    auth.mockResolvedValue({ userId: 'user_123' });

    // Mock categories
    getCategories.mockResolvedValue([
      { id: '1', name: 'Hrana', icon: '🍔' },
      { id: '2', name: 'Transport', icon: '🚗' },
    ]);

    // Mock stats
    sql
      .mockResolvedValueOnce([{ count: 5, income: 1000, expense: 500 }])
      .mockResolvedValueOnce([
        { id: 1, type: 'income', amount: 100, description: 'Plača', created_at: '2026-01-01', category_name: 'Hrana', category_icon: '🍔' },
        { id: 2, type: 'expense', amount: 50, description: 'Kava', created_at: '2026-01-02', category_name: 'Transport', category_icon: '🚗' },
      ]);

    render(await DashboardPage());

    // Stats
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Skupaj')).toBeInTheDocument();
    expect(screen.getByText('Prihodki')).toBeInTheDocument();
    expect(screen.getByText('Stroški')).toBeInTheDocument();
    expect(screen.getByText('Transakcije')).toBeInTheDocument();

    // Forms
    expect(screen.getAllByText(/Dodaj/i).length).toBe(2);

    // Transactions
    expect(screen.getByText('Plača')).toBeInTheDocument();
    expect(screen.getByText('Kava')).toBeInTheDocument();

    // Categories
    expect(screen.getByText('Hrana')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
  });
});
