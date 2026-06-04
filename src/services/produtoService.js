import api from './api'

export const produtoService = {
  listarTodos: () => api.get('/api/produtos'),
  buscarPorId: (id) => api.get(`/api/produtos/${id}`),
  cadastrar: (dados) => api.post('/api/produtos', dados),
  atualizar: (id, dados) => api.put(`/api/produtos/${id}`, dados),
  deletar: (id) => api.delete(`/api/produtos/${id}`),
}