
import GetAllTasks from "@/components/GetAllTasks";
import InputToDo from "@/components/InputTodo";
import Image from "next/image";



export default function Home() {
  return (
    <main className="bg-gradient-to-tr from-[#DD2476] to-[#FF512F] h-screen  flex items-center justify-center  ">

      <section className="bg-white bg-opacity-30 px-5 py-4 max-w-[500px] rounded-xl w-full shadow-lg  ">
        <div className="flex gap-x-3 mb-5">
          <Image src={'/icon.png'} alt="logo" width={60} height={60} />
          <h1 className="text-2xl font-bold font-sans pt-2">To-Do List</h1>
        </div>

        <main className="overflow-y-auto max-h-[400px] transition-all">
          {/* @ts-ignore */}
          <GetAllTasks />

        </main>

        <InputToDo />

        <div className="bg-black/80 rounded-xl w-1/2 h-2 mx-auto"></div>

      </section>


    </main>
  )
}
