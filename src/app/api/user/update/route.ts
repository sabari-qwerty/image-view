import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const POST = async (req: Request, res: Response) => {

    const { name, email, image } = await req.json()

    console.log({
        name, email, image
    })


    // check if user alerdy exist
    const check_user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (check_user) {
        const update_user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                name: name,
                picture: image
            }
        })

        return NextResponse.json({
            state: 200,
            message: "update data"
        })
    }


    return NextResponse.json(
        {
            state: 404,
            message: "user not found"
        }
    )

}