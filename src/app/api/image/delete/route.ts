import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const DELETE = async (req: NextRequest, res: Response) => {

    const data = await req.nextUrl.searchParams

    const id = data.get("id")

    if (id) {
        const data = await prisma.image.delete({
            where: {
                id
            }
        })

        return NextResponse.json(
            {
                data: "delte user"
            }
        )
    }



    return NextResponse.json({
        data: "ok"
    })
}