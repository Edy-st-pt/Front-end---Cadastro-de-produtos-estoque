const CATEGORIAS = [
  'Todas',
  'Eletrônicos',
  'Roupas',
  'Alimentos',
  'Móveis',
  'Ferramentas',
  'Outros',
]

function FiltrosBusca({ busca, onBuscaChange, categoria, onCategoriaChange, statusFiltro, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Buscar produto..."
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
      <select
        value={categoria}
        onChange={(e) => onCategoriaChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={statusFiltro}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="Todos">Todos</option>
        <option value="Ativo">Ativos</option>
        <option value="Inativo">Inativos</option>
      </select>
    </div>
  )
}

export default FiltrosBusca