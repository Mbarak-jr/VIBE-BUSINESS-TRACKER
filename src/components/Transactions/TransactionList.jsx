import { formatCurrency } from '../../utils/helpers'

const TransactionList = ({ transactions, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">No transactions found</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {transactions.slice(0, 10).map(t => (
        <div key={t.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
          <div className="flex-1">
            <p className="font-medium text-gray-900">{t.description}</p>
            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
              <span>{new Date(t.date).toLocaleDateString()}</span>
              {t.category && (
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                  {t.category}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold text-lg ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
              {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList