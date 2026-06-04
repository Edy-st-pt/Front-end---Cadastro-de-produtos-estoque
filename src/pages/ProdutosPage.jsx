import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import TabelaProdutos from '../components/TabelaProdutos'
import FiltrosBusca from '../components/FiltrosBusca'
import { produtoService } from '../services/produtoService'

function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [statusFiltro, setStatusFiltro] = useState('Todos')

  const carregarProdutos = async () => {
    try {
      setCarregando(true)
      const { data } = await produtoService.listarTodos()
      setProdutos(data)
    } catch {
      toast.error('Erro ao carregar produtos')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((p) => {
    const buscaOk = p.nome.toLowerCase().includes(busca.toLowerCase())
    const categoriaOk = categoria === 'Todas' || p.categoria === categoria
    const statusOk =
      statusFiltro === 'Todos' ||
      (statusFiltro === 'Ativo' && p.ativo) ||
      (statusFiltro === 'Inativo' && !p.ativo)
    return buscaOk && categoriaOk && statusOk
  })

  const handleEditar = (produto) => {
    console.log('editar', produto)
  }

  const handleDeletar = (produto) => {
    console.log('deletar', produto)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Produtos</h2>
            <p className="text-sm text-gray-500 mt-0.5">{produtos.length} produto(s) cadastrado(s)</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <Plus size={16} />
            Novo produto
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <FiltrosBusca
              busca={busca}
              onBuscaChange={setBusca}
              categoria={categoria}
              onCategoriaChange={setCategoria}
              statusFiltro={statusFiltro}
              onStatusChange={setStatusFiltro}
            />
          </div>

          {carregando ? (
            <div className="text-center py-16 text-gray-400">
              <p>Carregando produtos...</p>
            </div>
          ) : (
            <TabelaProdutos
              produtos={produtosFiltrados}
              onEditar={handleEditar}
              onDeletar={handleDeletar}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default ProdutosPage