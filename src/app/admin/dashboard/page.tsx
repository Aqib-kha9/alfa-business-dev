// app/admin/dashboard/page.tsx
export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[
        { label: 'Employees', value: 7 },
        { label: 'Tenants', value: 14 },
        { label: 'Visitors', value: 58 },
        { label: 'Units', value: 36 },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-600">{stat.label}</h3>
          <p className="text-2xl font-bold text-[#2d386a]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
