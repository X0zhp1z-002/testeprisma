import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop())

  try {
    await prisma.usuario.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    return Response.json({ erro: "Erro ao deletar" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop())
  const body = await req.json()
  const { nome, email } = body

  try {
    const atualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, email }
    })
    return Response.json(atualizado)
  } catch (error) {
    return Response.json({ erro: "Erro ao atualizar" }, { status: 500 })
  }
}
