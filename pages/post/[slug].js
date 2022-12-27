import client from '../../client'

const Post = ({ post }) => {
    if (!post) {
        return null
    }
    return (
        <article>
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
        </article>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type == "post" && defined(slug.current)][].slug.current`
    )
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const post = await client.fetch(
        `*[_type == "post" && slug.current == "${params.slug}"][0]{
            title,
            description,
            slug,
        }`
    )
    return {
        props: {
            post
        }
    }
}

export default Post