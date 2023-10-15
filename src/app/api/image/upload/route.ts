import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const POST = async (req: NextRequest, res: Response) => {

    const data = await req.json()

    const addImagedb = await prisma.image.create({
        data: {
            email: data.email,
            image_url: data.image
        }
    })

    return NextResponse.json({
        data: "added"
    })

}