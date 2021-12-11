import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ post }) {
    const router = useRouter();

    if (router.isFallback || !post) {
        return <div>Loading...</div>;
    }
    return (
        <Layout title={post.title}>
            <p className="m-4">{"ID: "}{post.id}</p>
            <p className="mb-4" text-xl font-bold>{post.title}</p>
            <p className="mb-12">{post.created}</p>
            <p className="px-10">{post.content}</p>
            <Link href="/blog-page" passHref>
                <div className="flex cursor-pointer mt-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Blog List</span>
                </div>
            </Link>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();

    return {
        paths,
        fallback: true,
    };
}
export async function getStaticProps({ params }) {
    const { post: post} = await getPostData(params.id);
    return {
        props: {
            post,
        },
        revalidate: 3,
    };
}