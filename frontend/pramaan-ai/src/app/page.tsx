import { AppShell } from "@/components";
import { PageHeader, Card } from "@/components/common";

export default function HomePage() {
  return (
    <AppShell>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of tender evaluation activities"
      />
      <div style={{ padding: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
          <Card title="Active Cases" hoverable>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#2563eb' }}>12</div>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>In progress</div>
          </Card>
          <Card title="Completed" hoverable>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#16a34a' }}>45</div>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>This month</div>
          </Card>
          <Card title="Pending Review" hoverable>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>8</div>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>Needs attention</div>
          </Card>
        </div>
        <Card title="Recent Activity">
          <p style={{ color: '#6b7280', margin: 0 }}>
            Recent evaluation activities will be displayed here.
          </p>
        </Card>
      </div>
    </AppShell>
  );
}
