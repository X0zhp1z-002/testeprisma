'use client'

import { useEffect, useState } from 'react'

type Usuario = {
  id: number
  nome: string
  email: string
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  async function carregarUsuarios() {
    const res = await fetch('/api/usuarios')
    const dados = await res.json()
    setUsuarios(dados)
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  async function criarUsuario() {
    await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email }),
    })
    setNome('')
    setEmail('')
    carregarUsuarios()
  }

  async function deletarUsuario(id: number) {
    await fetch(`/api/usuarios/${id}`, { method: 'DELETE' })
    carregarUsuarios()
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>

      <div className="mb-6">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={criarUsuario} className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar
        </button>
      </div>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id} className="flex justify-between items-center border-b py-2">
            <span>{u.nome} ({u.email})</span>
            <button
              onClick={() => deletarUsuario(u.id)}
              className="text-red-500 hover:underline"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
