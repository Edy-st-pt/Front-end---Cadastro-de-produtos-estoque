import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const CATEGORIAS = [
  'Eletrônicos',
  'Roupas',
  'Alimentos',
  'Móveis',
  'Ferramentas',
  'Outros',
]

const estadoInicial = {
  nome: '',
  descricao: '',
  preco: '',
  quantidade: '',
  categoria: '',
  ativo: true,
}

function ModalProduto({ aberto, onFechar, onSalvar, produto }) {
  const [form, setForm] = useState(estadoInicial)
  const [erros, setErros] = useState({})
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (produto) {
      setForm({
        nome: produto.nome,
        descricao: produto.descricao || '',
        preco: produto.preco,
        quantidade: produto.quantidade,
        categoria: produto.categoria,
        ativo: produto.ativo,
      })
    } else {
      setForm(estadoInicial)
    }
    setErros({})
  }, [produto, aberto])

  const validar = () => {
    const novosErros = {}

    if (!form.nome.trim())
      novosErros.nome = 'O nome é obrigatório'
    else if (form.nome.length > 100)
      novosErros.nome = 'O nome deve ter no máximo 100 caracteres'

    if (form.descricao.length > 500)
      novosErros.descricao = 'A descrição deve ter no máximo 500 caracteres'

    if (!form.preco)
      novosErros.preco = 'O preço é obrigatório'
    else if (Number(form.preco) <= 0)
      novosErros.preco = 'O preço deve ser maior que zero'

    if (form.quantidade === '')
      novosErros.quantidade = 'A quantidade é obrigatória'
    else if (Number(form.quantidade) < 0)
      novosErros.quantidade = 'A quantidade não pode ser negativa'

    if (!form.categoria)
      novosErros.categoria = 'A categoria é obrigatória'

    return novosErros
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErros((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async () => {
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    setSalvando(true)
    try {
      await onSalvar({
        ...form,
        preco: Number(form.preco),
        quantidade: Number(form.quantidade),
      })
      onFechar()
    } finally {
      setSalvando(false)
    }
  }

  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onFechar} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {produto ? 'Editar produto' : 'Novo produto'}
          </h2>
          <button
            onClick={onFechar}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome do produto"
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                erros.nome ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {erros.nome && <p className="text-red-500 text-xs mt-1">{erros.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descrição do produto (opcional)"
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                erros.descricao ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {erros.descricao && <p className="text-red-500 text-xs mt-1">{erros.descricao}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                placeholder="0,00"
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  erros.preco ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {erros.preco && <p className="text-red-500 text-xs mt-1">{erros.preco}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantidade"
                value={form.quantidade}
                onChange={handleChange}
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  erros.quantidade ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {erros.quantidade && <p className="text-red-500 text-xs mt-1">{erros.quantidade}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                erros.categoria ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {erros.categoria && <p className="text-red-500 text-xs mt-1">{erros.categoria}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="ativo"
              id="ativo"
              checked={form.ativo}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="ativo" className="text-sm text-gray-700">
              Produto ativo
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
          <button
            onClick={onFechar}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={salvando}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {salvando ? 'Salvando...' : produto ? 'Salvar alterações' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalProduto