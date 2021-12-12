import Link from "next/link"

export default function Todo({ todo }) {
    return (
        <div>
            <span>{todo.id}</span>
            {" : "}
            <Link href={`/todos/${todo.id}`}>
            <span className="cursor-pointer text-indigo-700 border-b border-pink-200 hover:bg-blue-400">
                {todo.title}
            </span>
            </Link>
        </div>
    )
}