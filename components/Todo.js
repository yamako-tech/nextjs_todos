import Link from "next/link";
import Cookie from "universal-cookie";
import { StateContext } from "../context/StateContext";

const cookie = new Cookie();

export default function Todo({ todo, todoDeleted }) {

    const deleteTodo = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_RETAPI_URL}api/todos/${todo.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${cookie.get("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid");
            }
        });
        todoDeleted();
    }
    return (
        <div>
            <span>{todo.id}</span>
            {" : "}
            <Link href={`/todos/${todo.id}`} passHref>
            <span className="cursor-pointer text-indigo-700 border-b border-pink-200 hover:bg-blue-400">
                {todo.title}
            </span>
            </Link>
            <div className="float-right ml-20">
            <svg 
                onClick={() => setSelectedTodo(todo)}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 float-left cursor-pointer" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <svg 
                onClick={deleteTodo}
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 mr-2 cursor-pointer" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
        </div>
    )
}