import client from '../../client'
import Seo from '../../components/Seo'
import BlockContent from '../../components/BlockContent'
import { InferGetStaticPropsType } from 'next'

import styles from '../../styles/post.module.css'

type PostData = {
    title: string
    description: string
    publishedAt: Date
    body: object[];
}

const Post = ({ post, currentSlug }: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!post) {
        return null
    }
    return (
        <article>
            <Seo
                title={post?.title ? post.title : process.env.NEXT_PUBLIC_SITE_TITLE}
                description={post?.description ? post.description : process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
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
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false,
    }
}

export async function getStaticProps({ params }: any) {
    const post: PostData = await client.fetch(
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