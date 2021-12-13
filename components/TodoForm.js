import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function TodoForm({ todoCreated }) {
    const { selectTodo, setSelectedTodo } = useContext(StateContext);
    const create = async (e) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todos/`, {
            method: "POST",
            body: JSON.stringify({ title: selectTodo.title }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${cookie.get("access_token")}`,
            },
        }).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid")
            }
        });
        setSelectedTodo({ id: 0, title: ""});
        todoCreated();
    };
    const update = async (e) => {
        e.preventDefault();
        await fetch(
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todos/${selectTodo.id}/`,
            {
                method: "PUT",
                body: JSON.stringify({ title: selectTodo.title }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${cookie.get("access_token")}`,
                },
            }
        ).then((res) => {
            if (res.status === 401) {
                alert("JWT Token not valid");
            }
        });
        setSelectedTodo({ id: 0, title: ""});
        todoCreated();
    };
    return (
        <div>
            <form onSubmit={selectTodo.id !== 0 ? update : create}>
                <input 
                    className="text-black mb-8 px-2 py-1"
                    type="text"
                    value={selectTodo.title}
                    onChange={(e) => 
                        setSelectedTodo({ ...selectTodo, title: e.target.value })
                    }
                />
                <button
                    type="submit"
                    className="bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase"
                >
                    {selectTodo.id !== 0 ? "update": "create"}
                </button>
            </form>
        </div>
    )
}
