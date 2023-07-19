'use client'

import { newTodo } from "@/db/drizzle";
import { useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useRouter } from "next/navigation"

export default function InputToDo() {

    const { refresh } = useRouter()

    const [Task, setTask] = useState("")

    async function handleSubmit() {
        const res = await fetch("/api/todos", {
            method: 'POST',
            body: JSON.stringify({
                task: Task
            })
        })
        setTask("")
        refresh()

    }


    return (
        <section className='justify-center items-center flex gap-3 mb-5 mt-[25px]'>
            <input value={Task} onChange={(e) => setTask(e.target.value)} type="text" className="bg-white border-none rounded-full px-4 active:border-none w-[300px] h-[50px] text-base font-sans ring-white ring-1 " placeholder="Write a new task" />
            <button type="button" className="bg-gradient-to-t from-[#DD2476] to-[#FF512F] rounded-full text-center p-3 shadow-md transition-all active:scale-90" onClick={handleSubmit}>
                <VscSend className="text-white text-4xl ml-1" />
            </button>

        </section>
    )
}
