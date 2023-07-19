

import TodoList from "./TodoList"



const getTodo = async () => {
    try {
        const data = await fetch("http://127.0.0.1:3000/api/todos", {
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


    return (
        <>
            <TodoList Data={res.data} />
        </>

    )
}
