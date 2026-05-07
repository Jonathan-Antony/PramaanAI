import { AppShell } from "@/components";
import { PageHeader, Card } from "@/components/common";

export default function ReportsPage() {
  return (
    <AppShell>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Generate and download evaluation reports"
      />
      <div style={{ padding: 40 }}>
        <Card title="Coming Soon">
          <p style={{ color: '#6b7280', margin: 0 }}>
            Report generation and analytics dashboard will be available soon.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
