import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import TabelaProdutos from '../components/TabelaProdutos'
import FiltrosBusca from '../components/FiltrosBusca'
import ModalProduto from '../components/ModalProduto'
import ModalConfirmacao from '../components/ModalConfirmacao'
import { produtoService } from '../services/produtoService'

function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [statusFiltro, setStatusFiltro] = useState('Todos')
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [modalConfirmacaoAberto, setModalConfirmacaoAberto] = useState(false)
  const [produtoParaDeletar, setProdutoParaDeletar] = useState(null)

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

  const handleAbrirModal = (produto = null) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }

  const handleFecharModal = () => {
    setModalAberto(false)
    setProdutoSelecionado(null)
  }

  const handleSalvar = async (dados) => {
    try {
      if (produtoSelecionado) {
        await produtoService.atualizar(produtoSelecionado.id, dados)
        toast.success('Produto atualizado com sucesso!')
      } else {
        await produtoService.cadastrar(dados)
        toast.success('Produto cadastrado com sucesso!')
      }
      await carregarProdutos()
    } catch (error) {
      const mensagem = error.response?.data?.mensagem || 'Erro ao salvar produto'
      toast.error(mensagem)
      throw error
    }
  }

  const handleAbrirConfirmacao = (produto) => {
    setProdutoParaDeletar(produto)
    setModalConfirmacaoAberto(true)
  }

  const handleCancelarDelecao = () => {
    setModalConfirmacaoAberto(false)
    setProdutoParaDeletar(null)
  }

  const handleConfirmarDelecao = async () => {
    try {
      await produtoService.deletar(produtoParaDeletar.id)
      toast.success('Produto removido com sucesso!')
      setModalConfirmacaoAberto(false)
      setProdutoParaDeletar(null)
      await carregarProdutos()
    } catch {
      toast.error('Erro ao remover produto')
    }
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
          <button
            onClick={() => handleAbrirModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
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
              onEditar={handleAbrirModal}
              onDeletar={handleAbrirConfirmacao}
            />
          )}
        </div>
      </main>

      <ModalProduto
        aberto={modalAberto}
        onFechar={handleFecharModal}
        onSalvar={handleSalvar}
        produto={produtoSelecionado}
      />

      <ModalConfirmacao
        aberto={modalConfirmacaoAberto}
        onConfirmar={handleConfirmarDelecao}
        onCancelar={handleCancelarDelecao}
        produto={produtoParaDeletar}
      />
    </div>
  )
}

export default ProdutosPage