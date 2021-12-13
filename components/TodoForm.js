import { useContext } from "react";
import { StateContext } from "../context/StateContext";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export default function TodoForm({ todoCreated }) {
    const { selectTodo, setSelectedTodo } = useContext(StateContext);
}
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