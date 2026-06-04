function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">E</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Estoque</h1>
            <p className="text-xs text-gray-500">Gerenciamento de produtos</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header