import { Pencil, Trash2 } from 'lucide-react'

function TabelaProdutos({ produtos, onEditar, onDeletar }) {
  if (produtos.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">Nenhum produto encontrado</p>
        <p className="text-sm mt-1">Tente ajustar os filtros ou cadastre um novo produto</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Nome</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Categoria</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Preço</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Quantidade</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
            <th className="text-left py-3 px-4 text-gray-500 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <p className="font-medium text-gray-900">{produto.nome}</p>
                {produto.descricao && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate max-w-48">{produto.descricao}</p>
                )}
              </td>
              <td className="py-3 px-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                  {produto.categoria}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-700 font-medium">
                {Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="py-3 px-4">
                <span className={`font-medium ${produto.quantidade <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                  {produto.quantidade}
                  {produto.quantidade <= 5 && (
                    <span className="ml-1 text-xs text-red-500">(baixo)</span>
                  )}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  produto.ativo
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {produto.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEditar(produto)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDeletar(produto)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TabelaProdutos