import Link from "next/link"

export default function Post({ post }) {
    return (
        <div>
            <span>{post.id}</span>
            {" : "}
            <Link href={`/posts/${post.id}`}>
            <span className="cursor-pointer text-indigo-700 border-b border-pink-200 hover:bg-blue-400 ">
                {post.title}
            </span>
            </Link>
        </div>
    )
}