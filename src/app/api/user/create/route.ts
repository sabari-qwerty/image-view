import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const POST = async (req: Request, res: Response) => {

    const { name, email, image } = await req.json()



    // check if user alerdy exist
    const check_user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    //  create user
    if (!check_user) {
        const create_user = await prisma.user.create({
            data: {
                name,
                email,
                picture: image
            }
        })
    }

    //  getUser
    const GetUser = await prisma.user.findUnique({
        where: {
            email
        }
    })



    return NextResponse.json({
        data: GetUser
    })


}