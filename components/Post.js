export default function Post({ post }) {
    return (
        <div>
            <span>{post.id}</span>
            {" : "}
            <span className="cursor-pointer text-indigo-700 border-b border-pink-200 hover:bg-blue-400 ">
                {post.title}
            </span>
        </div>
    )
}