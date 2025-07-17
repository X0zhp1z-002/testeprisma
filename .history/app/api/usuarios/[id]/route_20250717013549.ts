import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

function getIdFromRequest(req: NextRequest) {
  const parts = req.nextUrl.pathname.split('/')
  return Number(parts[parts.length - 1])
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromRequest(req)

  try {
    await prisma.usuario.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ erro: "Erro ao deletar" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const id = getIdFromRequest(req)
  const body = await req.json()
  const { nome, email } = body

  try {
    const atualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, email }
    })
    return NextResponse.json(atualizado)
  } catch (error) {
    return NextResponse.json({ erro: "Erro ao atualizar" }, { status: 500 })
  }
}
