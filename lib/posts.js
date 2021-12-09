import fetch from "node-fetch";

export async function getAllPostData() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post-list/`)
    );
    const posts = await res.json();
    const filterdPosts = posts.sort(
        (a, b) => new Date(b.created) - new Date(a.created)
    );
    return filterdPosts
}

export async function getAllPostIds() {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post-list/`)
    );
    const posts = await res.json();
    return posts.map((post) => {
        return {
            params: {
                id: String(post.id),
            },
        };
    });

}

export async function getPostData(id) {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/post-detail/${id}`)
    );
    const post = await res.json();
    return {
        post,
    };
}