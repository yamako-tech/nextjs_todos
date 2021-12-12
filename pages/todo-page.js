import { useEffect  } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTodoData } from "../lib/todos";
import Todo from "../components/Todo";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiurl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/todo-list`;

export default function TodoPage({ filterdTodos }) {

    const { data: todos, mutate } = useSWR( apiurl, fetcher, {
        fallbackData: filterdTodos,
    });

    const filterdTodos2 = todos?.sort(
        (a,b) => new Date(b.created) - new Date(a.created)
    );
    useEffect(() => {
        mutate();
    }, []);
    return (
    <Layout title="Todo Page">
        <ul>
            { filterdTodos2 &&
            filterdTodos2.map((todo) => (<Todo key={todo.id} todo={todo} todoDeleted={mutate} />))}
        </ul>
        <Link href="/main-page" passHref>
            <div className="flex cursor-pointer mt-12">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>
            </div>
        </Link>
    </Layout>
    );
}

export async function getStaticProps() {
    const filterdTodos = await getAllTodoData();

    return {
        props: { filterdTodos },
        revalidate: 3,
    };
}