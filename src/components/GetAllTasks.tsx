

import TodoList from "./TodoList"



const getTodo = async () => {
    try {
        const data = await fetch("/api/todos", {
            method: 'GET',
            cache: 'no-store'
        })
        if (!data.ok) {
            throw new Error('Failed to fetch data.')
        }

        const result = await data.json()

        return result
    } catch (error) {
        console.log((error as { message: string }).message)
    }

}





export default async function GetAllTasks() {
    const res = await getTodo()
    const data = res.data

    return (
        <>
            <TodoList Data={data} />
        </>

    )
}
