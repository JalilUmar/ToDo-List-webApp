import { Todo, db, todoTable } from "@/db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm'

export async function GET(req: NextRequest) {
    try {
        const getData: Todo[] = await db.select().from(todoTable)

        return NextResponse.json({ data: getData })

    } catch (error) {
        console.log((error as { message: string }).message)

        return NextResponse.json({ message: 'Failed to fetch data from database' })
    }
}

export async function POST(req: NextRequest) {

    const reqData = await req.json()
    try {
        if (reqData.task) {
            const reqInsert = await db.insert(todoTable).values({ task: reqData.task }).returning()

            return NextResponse.json({
                message: 'Task added successfully',
                data: reqInsert
            })
        } else {
            return NextResponse.json({ message: 'Task feild is required' })
        }

    } catch (error) {

        return NextResponse.json({ message: (error as { message: string }).message })
    }

}


export async function DELETE(req: NextRequest) {

    try {
        const { searchParams } = new URL(req.url)
        const id: number = Number(searchParams.get('id'))
        const check = await db.select().from(todoTable)
        const findId = check.find((val: Todo) => {
            if (val.id === id) { return true }
            else { return false }
        })

        if (findId) {
            const res = await db.delete(todoTable).where(eq(todoTable.id, id)).returning()

            return NextResponse.json({
                message: 'Task deleted successfully',
                type: 'DELETE',
                data: res
            })
        }
    } catch (error) {
        console.log((error as { message: string }).message)

        return NextResponse.json({
            message: "Something went wrong"
        })
    }
}