import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// Recebe params do argumento da função
// Para isso, deve declarar o segundo parâmetro 'context' com 'params'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id) // pega id do params, não da URL manualmente

  try {
    await prisma.usuario.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    return new Response(JSON.stringify({ erro: "Erro ao deletar" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  const body = await req.json()
  const { nome, email } = body

  try {
    const atualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, email }
    })
    return new Response(JSON.stringify(atualizado), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ erro: "Erro ao atualizar" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
