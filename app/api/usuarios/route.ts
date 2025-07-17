import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const usuarios = await prisma.usuario.findMany()
  return Response.json(usuarios)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { nome, email } = body

  try {
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email }
    })
    return Response.json(novoUsuario, { status: 201 })
  } catch (error) {
    return Response.json({ erro: "Erro ao criar usuário" }, { status: 500 })
  }
}
