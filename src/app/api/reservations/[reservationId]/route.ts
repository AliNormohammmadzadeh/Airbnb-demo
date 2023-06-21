import getCurrentUser from "@/src/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/src/app/libs/prismadb"

interface IPrams {
    reservationId?: string
}

export async function DELETE(request: Request , {params} : { params: IPrams}){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { reservationId } = params;

    if(!reservationId || typeof reservationId !== 'string' ) {
        throw new Error("Invalid ID")
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId : currentUser.id},
                { listing: { userId: currentUser.id }}
            ]
        }
    })

    return NextResponse.json(reservation)
}