import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateContextProvider(props) {
    const [selectedTodo, setSelectedTodo] = useState({ id: 0, title: ""});
    return (
        <StateContext.Provider 
            value ={{
                selectedTodo,
                setSelectedTodo,
            }}
            >
            {props.childredn}
            </StateContext.Provider>
    );
}