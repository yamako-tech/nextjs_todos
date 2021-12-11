import fetch from "node-fetch";

export async function getAllTodoData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todo-list/`)
    );
    const todos = await res.json();
    const staticfilterdTodos = todos.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
    );
    return staticfilterdTodos
}

export async function getAllTodoIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todo-list/`)
    );
    const todos = await res.json();
    return todos.map((todo) => {
        return {
            params: {
                id: String(todo.id),
            },
        };
    });
}

export async function getTodoData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todo-detail/${id}`)
    );
    const todo = await res.json();
    return {
        todo,
    };
}