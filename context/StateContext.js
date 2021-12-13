import { createContext, useState } from "reacct";

export const StateContext = createContext();

export default function StateContextProvider(props) {
    const [selectTodo, setSelectedTodo] = useState({ id: 0, title: ""});
    return (
        <StateContext.Provider 
            value ={{
                selecedtTodo,
                setSelectedTodo,
            }}
            >
            {props.childredn}
            </StateContext.Provider>
    );
}