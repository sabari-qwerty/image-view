import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req: NextRequest, res: Response) => {

    const data = await req.nextUrl.searchParams

    const id = data.get("id")

    console.log(id)


    if (id) {

        const data = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        const email = data?.email

        console.log(email)

        const getAllImage = await prisma.image.findMany({
            where: {
                email
            }
        })

        console.log(getAllImage)

        return NextResponse.json({
            data: getAllImage
        })
    }

    const email = data.get("email")

    console.log(email)

    const getAllImage = await prisma.image.findMany({
        where: {
            email: String(email)
        }
    })

    return NextResponse.json({
        data: getAllImage
    })



    return NextResponse.json({
        data: "hello"
    })


}