import { render, screen } from "@testing-library/react";
import DashboardPage from "../app/dashboard/page";

jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(),
}));

jest.mock("@/lib/db", () => ({
  sql: jest.fn(),
}));

jest.mock("../app/dashboard/actions", () => ({
  addTransaction: jest.fn(),
  getCategories: jest.fn(),
}));

import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";
import { getCategories } from "../app/dashboard/actions";

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("prikaze sporocilo, ce ni userId", async () => {
    auth.mockResolvedValue({ userId: null });

    render(await DashboardPage());
    expect(screen.getByText("Nisi prijavljen")).toBeInTheDocument();
  });

  it("rendera dashboard z osnovnimi podatki", async () => {
    auth.mockResolvedValue({ userId: "user_123" });

    getCategories.mockResolvedValue([
      { id: "1", name: "Hrana", icon: "🍔" },
    ]);

    sql
      .mockResolvedValueOnce([{ count: 1, income: 1000, expense: 500 }])
      .mockResolvedValueOnce([
        {
          id: 1,
          type: "income",
          amount: 100,
          description: "Placa",
          created_at: "2026-01-01",
          category_name: "Hrana",
          category_icon: "🍔",
        },
      ]);

    render(await DashboardPage());

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Skupaj")).toBeInTheDocument();
    expect(screen.getByText("Transakcije")).toBeInTheDocument();
  });
});
