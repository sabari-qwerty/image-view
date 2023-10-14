import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const GET = async (req: Request
    , res: Response
) => {
    const getAll = await prisma.user.findMany()

    return NextResponse.json({
        state: 200,
        data: getAll
    })
}