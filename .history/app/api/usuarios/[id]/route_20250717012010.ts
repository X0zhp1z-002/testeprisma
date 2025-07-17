import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)

  try {
    await prisma.usuario.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (error) {
    return Response.json({ erro: "Erro ao deletar" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await request.json()
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
