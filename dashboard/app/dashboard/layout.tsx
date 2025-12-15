import DashboardHeader from "./DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
