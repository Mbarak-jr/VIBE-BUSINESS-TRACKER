const DashboardCard = ({ title, value, trend, icon, color }) => {
    return (
      <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${color}`}>
        <h3 className="text-lg font-medium mb-2 text-gray-700">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
            {icon} {trend}
          </span>
        </div>
      </div>
    )
  }
  
  export default DashboardCard