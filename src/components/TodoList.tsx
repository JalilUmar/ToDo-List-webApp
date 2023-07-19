'use client'


import { useState, useEffect } from "react"
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation"
import { Todo } from "@/db/drizzle";


const getTodo = async () => {
    try {
        const getData = await fetch("/api/todos", {
            method: 'GET',
            cache: 'no-store'
        })
        if (!getData.ok) {
            throw new Error('Failed to fetch data.')
        }

        const result = await getData.json()

        return result
    } catch (error) {
        console.log((error as { message: string }).message)
    }

}


export default async function TodoList() {

    const res = await getTodo()
    const Data: Todo[] = res.data
    const router = useRouter()
    const [isCheck, setCheck] = useState([{}])


    const handleDelete = async (id: number) => {
        try {
            const delTodo = await fetch(`/api/todo?id=${id}`, {
                method: 'DELETE',
            })
            setCheck((prev: any) => {
                const updatedCheckState = { ...prev };
                delete updatedCheckState[id];
                return updatedCheckState;
            });
            router.refresh()

        } catch (error) {
            console.log((error as { message: string }).message)
        }

    }


    useEffect(() => {
        const initialCheckState = [{}]
        Data.forEach((todo: { id: number, task: string }) => {
            initialCheckState[todo.id] = false
        });
        setCheck(initialCheckState)
    }, [Data])


    const handleCheck = (id: number) => {
        setCheck((prev: any) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }
    return (
        <main className="my-5 ">
            {
                Data.map((todo: { task: string, id: number }) => {
                    const Check: any = isCheck[todo.id]
                    return (
                        <section key={todo.id} className={`bg-gray-100 cursor-pointer py-3 px-3 flex rounded-xl my-3 mx-2 max-w-md shadow-md ${!Check ? 'bg-opacity-100' : 'bg-opacity-60'}`}>
                            <div className="flex gap-x-3" >
                                {
                                    !Check ? (
                                        <RiCheckboxBlankCircleLine className="text-[#FF512F] text-3xl active:text-[#ff522fbe]" onClick={() => handleCheck(todo.id)} />

                                    ) : (
                                        <RiCheckboxCircleFill className="text-[#FF512F] text-3xl active:text-[#ff522fbe]" onClick={() => handleCheck(todo.id)} />
                                    )
                                }
                                <span className={`text-lg font-semibold ${Check ? 'line-through' : ''}`}>{todo.task}</span>
                            </div>

                            <div className="ml-auto">
                                <button type="button" onClick={() => handleDelete(todo.id)} className="transition-all active:scale-90 text-center "  >
                                    <MdDelete className="text-[#FF512F] text-3xl" />
                                </button>
                            </div>


                        </section>

                    )
                })

            }

        </main>
    )
}