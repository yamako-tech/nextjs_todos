import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllTodoData, getTodoData } from "../../lib/todos";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Post({ staticTodo, id }) {
    const router = useRouter();
    const { data: task, mutate } = useSWR(
        `${process.env.NEXT_PUBLIC_RESTFUL_URL}api/todo-detail/${id}`,
        fetcher,
        {
            initialData: staticTodo,
        }
    );
    useEffect(() => {
        mutate();
    }, []); 
    if (router.isFallback || !todo) {
        return <div>Loading...</div>
    }
    return (
        <Layout title={todo.title}>
            <span className="mb-4">
                {"ID: "}
                {todo.id}
            </span>
            <p className="mb-4 text-xl font-bold">{todo.title}}</p>
            <p className="mb-12">{todo.created}</p>
            <Link href="/todo-page" passHref>
                <div className="flex cursor-pointer mt-8">
                <Link href="/blog-page" passHref>
                <div className="flex cursor-pointer mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Todo List</span>
                </div>
            </Link>
                </div>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllTodoData();
    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({params}) {
    const {todo: staticTodo} = await getTodoData(params.id);
    return {
        props: {
            id: staticTodo.id,
            staticTodo,
        },
        revalidate: 3,
    }
}