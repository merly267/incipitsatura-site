import client from '../../client'
import Seo from '../../components/Seo'
import BlockContent from '../../components/BlockContent'

import styles from '../../styles/post.module.css'

const Post = ({ post, currentSlug }) => {
    if (!post) {
        return null
    }
    return (
        <article>
            <Seo
                title={post?.title}
                description={post?.description}
                url={`${process.env.NEXT_PUBLIC_SITE_ROOT}/post/${currentSlug}`}
            />
            <h1 className={styles.heading}>{post?.title}</h1>
            <p className={styles.publication_info}>{`Published on ${new Date(post?.publishedAt).toLocaleDateString('en-uk', { day: "numeric", year:"numeric", month:"long" })}`}</p>
            <div>
                <BlockContent blocks={post?.body} />
            </div>
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
            publishedAt,
            body[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "customLink" => {
                        "slug": @.internal->slug
                    }
                },
                asset->{
                    ...,
                    metadata
                }
            },
        }`
    )
    const currentSlug = params.slug;
    return {
        props: {
            post,
            currentSlug
        }
    }
}

export default Post