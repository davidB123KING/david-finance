import { render, screen } from "@testing-library/react";
import GraphsClient from "../app/dashboard/graphs/GraphsClient";
import IncomeExpenseChart from "../app/dashboard/graphs/IncomeExpenseChart";
import CategoryChart from "../app/dashboard/graphs/CategoryChart";

jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => (
    <div style={{ width: 400, height: 300 }}>{children}</div>
  ),
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: ({ children }) => <div>{children}</div>,
  Cell: () => <div />,
  Tooltip: () => <div />,
  BarChart: ({ children }) => <div>{children}</div>,
  Bar: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
}));

describe("Graphs components render", () => {
  it("rendera GraphsClient z obema grafoma", () => {
    render(
      <GraphsClient
        data={[
          { name: "Prihodki", value: 120 },
          { name: "Stroski", value: 80 },
        ]}
        categoryData={[
          { name: "Hrana", value: 40, color: "#22c55e" },
        ]}
      />
    );

    expect(screen.getByText("Prihodki vs Stroški")).toBeInTheDocument();
    expect(screen.getByText("Stroški po kategorijah")).toBeInTheDocument();
  });

  it("rendera IncomeExpenseChart", () => {
    render(
      <IncomeExpenseChart
        data={[
          { name: "Prihodki", value: 100 },
          { name: "Stroski", value: 50 },
        ]}
      />
    );

    expect(screen.getByText("Prihodki vs Stroški")).toBeInTheDocument();
  });

  it("rendera CategoryChart z vsebino", () => {
    render(
      <CategoryChart
        data={[
          { name: "Hrana", value: 30, color: "#22c55e" },
          { name: "Transport", value: 20, color: "#3b82f6" },
        ]}
      />
    );

    expect(screen.getByText("Stroški po kategorijah")).toBeInTheDocument();
  });

  it("rendera CategoryChart z praznimi podatki", () => {
    render(<CategoryChart data={[]} />);
    expect(
      screen.getByText("Ni stroškov za prikaz po kategorijah.")
    ).toBeInTheDocument();
  });
});
