import { Trash2 } from 'lucide-react'

function ModalConfirmacao({ aberto, onConfirmar, onCancelar, produto }) {
  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancelar} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 size={18} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Remover produto</h2>
              <p className="text-sm text-gray-500">Essa ação não pode ser desfeita</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
            Tem certeza que deseja remover o produto{' '}
            <span className="font-semibold text-gray-900">{produto?.nome}</span>?
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sim, remover
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacao