import client from '../../client'
import BlockContent from '../../components/blockContent'

const Post = ({ post }) => {
    if (!post) {
        return null
    }
    return (
        <article>
            <h1>{post?.title}</h1>
            <main>
                <BlockContent blocks={post?.body} />
            </main>
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
            body[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "customLink" => {
                        "slug": @.internal->slug
                    }
                }
            },
        }`
    )
    return {
        props: {
            post
        }
    }
}

export default Post