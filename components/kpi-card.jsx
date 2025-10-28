export default function KpiCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value ?? '—'}</p>
      </div>
      {Icon && (
        <Icon className="text-gray-400 w-6 h-6" />
      )}
    </div>
  );
}